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

export default function BookingForm({
  serviceTitle,
  duration,
  onClose,
}: Props) {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  console.log(selectedDate, selectedTime);
  useEffect(() => {
    if (!selectedDate) return;

    const slots: string[] = [];

    const startHour = 9;
    const startMinute = 30;
    const endHour = 19;

    const date = new Date(selectedDate);
    date.setHours(startHour, startMinute, 0, 0);

    while (date.getHours() < endHour) {
      const timeString = date.toTimeString().slice(0, 5);
      slots.push(timeString);
      date.setMinutes(date.getMinutes() + 30);
    }

    setTimeSlots(slots);
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTime || !selectedDate) {
      setMessage("Оберіть час і дату");
      return;
    }

    const dateTime = new Date(`${selectedDate}T${selectedTime}`);

    const res = await fetch("/api/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        dateTime,
        serviceTitle,
        duration,
      }),
    });

    const data = await res.json();
    setMessage(data.message);

    if (res.ok) setTimeout(onClose, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg ">
        <span className="text-xl font-bold ">Процедура: </span>
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

      <DatePicker
        selected={selectedDate ? new Date(selectedDate) : null}
        onChange={(date: Date | null) => {
          if (date) {
            setSelectedDate(date.toISOString().split("T")[0]); // формат YYYY-MM-DD
            setSelectedTime("");
          } else {
            setSelectedDate("");
            setSelectedTime("");
          }
        }}
        locale="uk"
        dateFormat="dd.MM.yyyy"
        placeholderText="Оберіть дату"
        className="w-full border rounded px-4 py-2 bg-white text-black cursor-pointer"
        minDate={new Date()}
        withPortal
      />

      {selectedDate && (
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => (
            <button
              type="button"
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-4 py-2 rounded border text-sm ${
                selectedTime === time
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      )}

      <Button title="Записатися" type="submit" className="w-full" />

      {message && <p className="text-center text-sm mt-2">{message}</p>}
    </form>
  );
}
