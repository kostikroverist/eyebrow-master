import { useState, useEffect } from "react";
import Button from "./Button";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { uk } from "date-fns/locale";

registerLocale("uk", uk);

type Props = {
  serviceTitle: string;
  duration: number;
  onClose: () => void;
};

type BusyInterval = {
  start: string;
  end: string;
};

export default function BookingForm({
  serviceTitle,
  duration,
  onClose,
}: Props) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [blockedDates, setBlockedDates] = useState<Date[]>([]);

  // ✅ НОВИЙ СТАН: для відстеження процесу запису
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!selectedDate) {
      setTimeSlots([]);
      return;
    }

    const fetchAvailableSlots = async () => {
      setIsLoading(true);
      setMessage("");

      if (selectedDate.getDay() === 0) {
        setMessage("У неділю запис не проводиться.");
        setTimeSlots([]);
        setIsLoading(false);
        return;
      }

      const allSlots: string[] = [];
      const startHour = 9;
      const endHour = 19;
      const interval = 30;

      const date = new Date(selectedDate);
      date.setHours(startHour, 0, 0, 0);

      while (date.getHours() < endHour) {
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");
        allSlots.push(`${hours}:${minutes}`);
        date.setMinutes(date.getMinutes() + interval);
      }

      try {
        const year = selectedDate.getFullYear();
        const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
        const day = selectedDate.getDate().toString().padStart(2, "0");
        const dateString = `${year}-${month}-${day}`;

        const res = await fetch(`/api/get-busy-slots?date=${dateString}`);
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Не вдалося завантажити слоти.");
        }

        const busyIntervals: BusyInterval[] = data.busy;

        const isFullyBusy = busyIntervals.some((interval) => {
          const start = new Date(interval.start);
          const end = new Date(interval.end);
          return (
            start.getHours() === 0 &&
            start.getMinutes() === 0 &&
            end.getHours() === 23 &&
            end.getMinutes() >= 59
          );
        });

        if (isFullyBusy) {
          setMessage("У цей день прийом не проводиться.");
          setTimeSlots([]);
          return;
        }

        const availableSlots = allSlots.filter((slot) => {
          const [hours, minutes] = slot.split(":").map(Number);

          const slotStart = new Date(selectedDate);
          slotStart.setHours(hours, minutes, 0, 0);
          const slotEnd = new Date(slotStart.getTime() + duration * 60000);

          return !busyIntervals.some((busy) => {
            const busyStart = new Date(busy.start);
            const busyEnd = new Date(busy.end);
            return slotStart < busyEnd && slotEnd > busyStart;
          });
        });

        setTimeSlots(availableSlots);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setMessage(error.message);
        } else {
          setMessage("Сталася помилка при завантаженні слотів.");
        }
        setTimeSlots(allSlots);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAvailableSlots();
  }, [selectedDate, duration]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!selectedTime || !selectedDate || !name || !phone) {
      setMessage("Будь ласка, заповніть всі поля та оберіть час.");
      return;
    }

    setIsSubmitting(true);

    const [hours, minutes] = selectedTime.split(":").map(Number);
    const dateTime = new Date(selectedDate);
    dateTime.setHours(hours, minutes, 0, 0);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          dateTime: dateTime.toISOString(),
          serviceTitle,
          duration,
        }),
      });

      if (res.ok) {
        // ✅ ДОДАНО: Показуємо повідомлення про успіх та закриваємо вікно
        setMessage("Ви успішно записалися!");
        setTimeout(() => {
          onClose(); // Викликаємо функцію для закриття модального вікна
        }, 2000); // Закриваємо через 2 секунди, щоб користувач побачив повідомлення
      } else {
        // ✅ ДОДАНО: Обробка помилок від сервера
        const data = await res.json();
        throw new Error(
          data.message || "Не вдалося записатися. Спробуйте ще раз."
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage("Сталася помилка. Спробуйте ще раз.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg">
        <span className="text-xl font-bold">Процедура: </span>
        {serviceTitle}
      </h3>

      <input
        type="text"
        name="name"
        placeholder="Ваше імʼя"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border rounded px-4 py-2"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Ваш номер телефону"
        value={phone} // Вам потрібно буде створити цей стан
        onChange={(e) => setPhone(e.target.value)} // і цю функцію
        required
        className="w-full border rounded px-4 py-2"
      />
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date | null) => {
          setSelectedDate(date);
          setSelectedTime("");
        }}
        locale="uk"
        dateFormat="dd.MM.yyyy"
        placeholderText="Оберіть дату"
        className="w-full border rounded px-4 py-2 bg-white text-black cursor-pointer"
        minDate={new Date()}
        withPortal
        filterDate={(date) => {
          const isSunday = date.getDay() === 0;
          const isBlocked = blockedDates.some(
            (d) => d.toDateString() === date.toDateString()
          );
          return !isSunday && !isBlocked;
        }}
      />

      {selectedDate && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {isLoading ? (
            <p className="col-span-full text-center">
              Завантаження вільних годин...
            </p>
          ) : timeSlots.length > 0 ? (
            timeSlots.map((time) => (
              <button
                type="button"
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`px-4 py-2 rounded border text-sm transition-colors ${
                  selectedTime === time
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-black hover:bg-gray-100"
                }`}
              >
                {time}
              </button>
            ))
          ) : (
            <p className="col-span-full text-center">
              На цей день вільних місць немає.
            </p>
          )}
        </div>
      )}

      {/* ✅ ОНОВЛЕНА КНОПКА */}
      <Button
        title={isSubmitting ? "Запис..." : "Записатися"}
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      />

      {message && <p className="text-center text-sm mt-2">{message}</p>}
    </form>
  );
}
