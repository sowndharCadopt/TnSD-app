import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../Header/Header';
import data from "../selectOptions.json"

import event from "../event.json"
import { MdClear } from "react-icons/md";
import "./Dashboard.scss"
import { set } from 'date-fns';


const localizer = momentLocalizer(moment);






const Dashboard = () => {
    const [show, setShow] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState([]);
    const [view, setView] = useState("month");
    const [date, setDate] = useState(new Date());
    const [selectedAcademicYear, setAcademicYear] = useState("");
    const [selectedSemester, setSemester] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedZone, setSelectedZone] = useState("");
    const [selectedUniversity, setSelectedUniversity] = useState("");
    const [selectedCollegeType, setSelectedCollegeType] = useState("");
    const [selectedCollege, setSelectedCollege] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("");
    const [filteredEvents, setFilteredEvents] = useState(event);

    const navigate = useNavigate()

    useEffect(() => {
        const filterEvents = () => {
            let filtered = [...event];
            if (selectedAcademicYear) {
                filtered = filtered.filter(e =>
                    e['Academic Year']?.toLowerCase().includes(selectedAcademicYear.toLowerCase()));
            }
            if (selectedSemester) {
                filtered = filtered.filter(e => e['Semester']?.toString() === selectedSemester.toString());
            }

            if (selectedDistrict) {
                filtered = filtered.filter(e =>
                    e.District?.toLowerCase().includes(selectedDistrict.toLowerCase())
                );
            }
            if (selectedZone) {
                filtered = filtered.filter(e =>
                    e.Zone?.toLowerCase().includes(selectedZone.toLowerCase())
                );
            }
            if (selectedUniversity) {
                filtered = filtered.filter(e =>
                    e.University?.toLowerCase().includes(selectedUniversity.toLowerCase())
                );
            }
            if (selectedCollegeType) {
                filtered = filtered.filter(e =>
                    e["College Type"]?.toLowerCase().includes(selectedCollegeType.toLowerCase())
                );
            }
            if (selectedCollege) {
                filtered = filtered.filter(e =>
                    e["College Name"]?.toLowerCase().includes(selectedCollege.toLowerCase())
                );
            }
            if (selectedCourse) {
                filtered = filtered.filter(e =>
                    e["Course Name"]?.toLowerCase().includes(selectedCourse.toLowerCase())
                );
            }

            setFilteredEvents(filtered);


        };

        filterEvents();
    }, [selectedAcademicYear, selectedSemester, selectedDistrict, selectedZone, selectedUniversity, selectedCollegeType, selectedCollege, selectedCourse]);




    const handleSelectEvent = (event) => {

        setSelectedEvents([event])
        setShow(true)
        console.log("selectedEvent", selectedEvents)
    }
    const handleSelectDate = (slotInfo) => {
        const selectedDate = moment(slotInfo.start).format("YYYY-MM-DD");
        console.log("Fileterd Logs", filteredEvents)
        const filteredEventss = filteredEvents.filter(event =>
            moment(event.start).format("YYYY-MM-DD") === selectedDate
        );

        setSelectedEvents(filteredEventss);
        setShow(true);
    };


    const handleClose = () => setShow(false);

    const clearFilter = () => {
        setAcademicYear("")
        setSemester("")
        setSelectedDistrict("")
        setSelectedZone("")
        setSelectedUniversity("")
        setSelectedCollegeType("")
        setSelectedCollege("")
        setSelectedCourse("")
    }

    const handleAcademicYearChange = (e) => {
        setAcademicYear(e.target.value);
        setSemester("")
        setSelectedDistrict("");
        setSelectedZone("");
        setSelectedUniversity("");
        setSelectedCollegeType("");
        setSelectedCollege("");
        setSelectedCourse("");
    };

    const handleSemesterChange = (e) => {
        setSemester(e.target.value);
        setSelectedDistrict("");
        setSelectedZone("");
        setSelectedUniversity("");
        setSelectedCollegeType("");
        setSelectedCollege("");
        setSelectedCourse("");
    };

    const handleDistrictChange = (e) => {
        setSelectedDistrict(e.target.value);
        setSelectedZone("");
        setSelectedUniversity("");
        setSelectedCollegeType("");
        setSelectedCollege("");
        setSelectedCourse("");
    };

    const handleZoneChange = (e) => {
        setSelectedZone(e.target.value);
        setSelectedUniversity("");
        setSelectedCollegeType("");
        setSelectedCollege("");
        setSelectedCourse("");
    };

    const handleUniversityChange = (e) => {
        setSelectedUniversity(e.target.value);
        setSelectedCollegeType("");
        setSelectedCollege("");
        setSelectedCourse("");
    };

    const handleCollegeTypeChange = (e) => {
        setSelectedCollegeType(e.target.value);
        setSelectedCollege("");
        setSelectedCourse("");
    };

    const handleCollegeChange = (e) => {
        setSelectedCollege(e.target.value);
        setSelectedCourse("");
    };

    const handleCourseChange = (e) => {
        setSelectedCourse(e.target.value);
    };

    const filteredZones =
        data.find((district) => district.District === selectedDistrict)?.Zones || [];

    const filteredUniversities =
        filteredZones.find((zone) => zone.Zone === selectedZone)?.Universities || [];

    const filteredCollegeTypes =
        filteredUniversities.find((uni) => uni.University === selectedUniversity)
        ?.["College Types"] || [];

    const filteredColleges =
        filteredCollegeTypes.find((type) => type["College Type"] === selectedCollegeType)
            ?.Colleges || [];

    const filteredCourses =
        filteredColleges.find((college) => college["College Name"] === selectedCollege)
            ?.Courses || [];

    return (
        <>
            <Header />
            <div className='dashboard-main-bg'>
                <div className="dashboard-div-bg">
                    <div className="dashboard-logo-div">
                        <div className='logo-container'>
                            <p>தமிழ்நாடு அரசு</p>
                            <p> Government of Tamil Nadu</p>
                            <img src="/government-logo.png" />
                        </div>
                        <span className='empty-div'>
                        </span>
                        <div className='logo-container1'>
                            <p>தமிழ்நாடு திறன் மேம்பாட்டுக் கழகம் </p>
                            <p>Tamil Nadu Skill Development Corporation </p>
                            <img src="/tnsk.png" />
                        </div>
                    </div>
                    <div className='filter-outer-div'>
                        <div className="filter-section-div">
                            <p>Filters</p>
                            <button className="clear-btn" onClick={clearFilter}>Clear Filters</button>
                        </div>
                        <div className='filter-bar-div'>
                            {/* Academic Year Dropdown */}
                            <select value={selectedAcademicYear} onChange={handleAcademicYearChange}>
                                <option value="" disabled hidden>
                                    Academic Year
                                </option>
                                <option value="2024-2025">2024-2025</option>
                                <option value="2023-2024">2023-2024</option>
                                <option value="2022-2023">2022-2023</option>
                                {/* {data.map((district, index) => (
                                <option key={index} value={district.District}>
                                    {district.District}
                                </option>
                                ))} */}
                            </select>

                            {/*semester Dropdown */}
                            <select value={selectedSemester} onChange={handleSemesterChange} disabled={!selectedAcademicYear}>
                                <option value="" disabled hidden>
                                    Semester
                                </option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                {/* {filteredZones.map((zone, index) => (
                                <option key={index} value={zone.Zone}>
                                    {zone.Zone}
                                </option>
                                ))} */}
                            </select>
                            {/* District Dropdown */}
                            <select value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedSemester}>
                                <option value="" disabled hidden>
                                    District
                                </option>
                                {data.map((district, index) => (
                                    <option key={index} value={district.District}>
                                        {district.District}
                                    </option>
                                ))}
                            </select>

                            {/* Zone Dropdown */}
                            <select value={selectedZone} onChange={handleZoneChange} disabled={!selectedDistrict}>
                                <option value="" disabled hidden>
                                    Zone
                                </option>
                                {filteredZones.map((zone, index) => (
                                    <option key={index} value={zone.Zone}>
                                        {zone.Zone}
                                    </option>
                                ))}
                            </select>

                            {/* University Dropdown */}
                            <select value={selectedUniversity} onChange={handleUniversityChange} disabled={!selectedZone}>
                                <option value="" disabled hidden>
                                    University
                                </option>
                                {filteredUniversities.map((uni, index) => (
                                    <option key={index} value={uni.University}>
                                        {uni.University}
                                    </option>
                                ))}
                            </select>

                            {/* College Type Dropdown */}
                            <select
                                value={selectedCollegeType}
                                onChange={handleCollegeTypeChange}
                                disabled={!selectedUniversity}
                            >
                                <option value="" disabled hidden>
                                    College Type
                                </option>
                                {filteredCollegeTypes.map((type, index) => (
                                    <option key={index} value={type["College Type"]}>
                                        {type["College Type"]}
                                    </option>
                                ))}
                            </select>

                            {/* College Name Dropdown */}
                            <select value={selectedCollege} onChange={handleCollegeChange} disabled={!selectedCollegeType}>
                                <option value="" disabled hidden>
                                    College Name
                                </option>
                                {filteredColleges.map((college, index) => (
                                    <option key={index} value={college["College Name"]}>
                                        {college["College Name"]}
                                    </option>
                                ))}
                            </select>

                            {/* Course Name Dropdown */}
                            <select
                                value={selectedCourse}
                                onChange={handleCourseChange}
                                disabled={!selectedCollege}
                            >
                                <option value="" disabled>
                                    Course Name
                                </option>
                                {filteredCourses.map((course, index) => (
                                    <option key={index} value={course}>
                                        {course}
                                    </option>
                                ))}
                            </select>

                        </div>
                    </div>
                    <div className='dashboard-bg'>
                        {/* <Calendar
                            localizer={localizer}
                            events={filteredEvents}
                            startAccessor={(event) => new Date(event.start)}
                            endAccessor={(event) => new Date(event.end)}
                            style={{ height: 500 }}
                            // onSelectEvent={handleSelectEvent}
                            onSelectEvent={handleSelectDate}
                            onSelectSlot={handleSelectDate}
                            selectable
                            view={view}
                            // onView={(newView) => setView(newView)}
                            date={date}
                            views={["month","week","day"]}
                            onNavigate={(newDate) => setDate(newDate)}
                        /> */}
                        <Calendar
                            localizer={localizer}
                            events={filteredEvents}
                            startAccessor={(event) => new Date(event.start)}
                            endAccessor={(event) => new Date(event.end)}
                            style={{ height: 500 }}
                            selectable
                            view={view}
                            date={date}
                            views={["month", "week", "day"]}
                            onNavigate={(newDate) => setDate(newDate)}
                            onSelectEvent={handleSelectDate}
                            onSelectSlot={handleSelectDate}
                            components={{
                                eventWrapper: ({ children, event }) => (
                                    <div onClick={() => handleSelectDate(event)}>{children}</div>
                                ),
                            }}
                        />



                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title className="fw-bold text-primary">
                                    📅 Events on Selected Date
                                </Modal.Title>
                            </Modal.Header>


                            <Modal.Body className="modal-body" >
                                {selectedEvents.length > 0 ? (
                                    selectedEvents.map((event, index) => (
                                        <div key={index} className="p-3 mb-3 border rounded shadow-sm bg-light">
                                            <h5 className="text-dark fw-semibold">{event.title}</h5>


                                            {Object.entries(event).map(([key, value]) => {
                                                if (key !== "id" && key !== "title" && key !== "start" && key !== "end") {
                                                    return (
                                                        <p key={key} className="text-muted mb-1">
                                                            <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong> {value}
                                                        </p>
                                                    );
                                                }
                                            })}


                                            <p className="text-muted mb-1">
                                                <strong>Start:</strong> {moment(event.start).format("MMMM Do YYYY, h:mm A")}
                                            </p>
                                            <p className="text-muted mb-1">
                                                <strong>End:</strong> {moment(event.end).format("MMMM Do YYYY, h:mm A")}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-muted">No events on this date.</p>
                                )}
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="outline-secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>


                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;