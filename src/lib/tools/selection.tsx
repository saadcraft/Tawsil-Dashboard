import { useState } from 'react';

const YearSelector = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 3; // Adjust the start year to your preference
    // const endYear = currentYear + 0;   // Adjust the end year to your preference

    // Generate years array
    const years = [];
    for (let year = startYear; year <= currentYear; year++) {
        years.push(year);
    }

    const [selectedYear, setSelectedYear] = useState(currentYear);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(parseInt(event.target.value, 10));
    };

    return (
        <div>
            <select
                id="year-select"
                value={selectedYear}
                onChange={handleChange}
                className='px-3 py-1 outline-none border-b'
            >
                {years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default YearSelector;