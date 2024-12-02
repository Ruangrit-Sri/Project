import { useEffect, useState } from "react";

export default function ProgressBar({ startDate, endDate }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const calculateProgress = () => {
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();
            const now = new Date().getTime();

            if (now <= start) {
                setProgress(0);
            } else if (now >= end) {
                setProgress(100);
            } else {
                setProgress(((now - start) / (end - start)) * 100);
            }
        };

        calculateProgress();
        const interval = setInterval(calculateProgress, 1000);
        return () => clearInterval(interval);
    }, [startDate, endDate]);

    return (
        <div className="relative w-full bg-gray-200 h-6 rounded">
            <div
                className="absolute top-0 left-0 h-6 bg-blue-500 rounded"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
}
