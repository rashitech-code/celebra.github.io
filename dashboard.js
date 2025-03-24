document.addEventListener('DOMContentLoaded', function() {
    // Toggle sidebar on mobile
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('expanded');
        });
    }
    
    // Toggle view (list/grid)
    const gridViewBtn = document.getElementById('grid-view');
    const listViewBtn = document.getElementById('list-view');
    const eventsContainer = document.getElementById('events-container');
    
    if (gridViewBtn && listViewBtn) {
        gridViewBtn.addEventListener('click', function() {
            eventsContainer.classList.remove('list-view');
            eventsContainer.classList.add('grid-view');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
        });
        
        listViewBtn.addEventListener('click', function() {
            eventsContainer.classList.add('list-view');
            eventsContainer.classList.remove('grid-view');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
        });
    }
    
    // Filter events
    const eventFilter = document.getElementById('event-filter');
    const eventCards = document.querySelectorAll('.event-card');
    
    if (eventFilter) {
        eventFilter.addEventListener('change', function() {
            const filterValue = this.value;
            
            eventCards.forEach(card => {
                if (filterValue === 'all' || card.dataset.category === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Delete event modal
    const deleteButtons = document.querySelectorAll('.btn-delete');
    const deleteModal = document.getElementById('delete-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelBtn = document.querySelector('.btn-cancel');
    const confirmBtn = document.querySelector('.btn-confirm');
    let currentEventId = null;
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            currentEventId = this.dataset.eventId;
            deleteModal.classList.add('active');
        });
    });
    
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            deleteModal.classList.remove('active');
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            deleteModal.classList.remove('active');
        });
    }
    
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            // Here you would typically make an API call to delete the event
            console.log(`Deleting event with ID: ${currentEventId}`);
            
            // For demo purposes, let's remove the card from the UI
            const eventToDelete = document.querySelector(`.btn-delete[data-event-id="${currentEventId}"]`).closest('.event-card');
            eventToDelete.style.opacity = '0';
            eventToDelete.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                eventToDelete.remove();
                
                // Update stats count
                const statsNumber = document.querySelector('.stat-number');
                if (statsNumber) {
                    let count = parseInt(statsNumber.textContent);
                    statsNumber.textContent = count - 1;
                }
            }, 300);
            
            deleteModal.classList.remove('active');
        });
    }
    
    // Mini Calendar
    const calendarGrid = document.querySelector('.calendar-grid');
    const calendarMonth = document.getElementById('calendar-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    // Sample event dates (you would fetch these from your backend)
    const eventDates = ['2023-06-15', '2023-06-22', '2023-07-05'];
    
    function generateCalendar(month, year) {
        // Clear existing calendar days
        const existingDays = document.querySelectorAll('.calendar-day');
        existingDays.forEach(day => day.remove());
        
        // Set the month and year in the header
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                           'July', 'August', 'September', 'October', 'November', 'December'];
        calendarMonth.textContent = `${monthNames[month]} ${year}`;
        
        // Get the first day of the month
        const firstDay = new Date(year, month, 1).getDay();
        
        // Get the number of days in the month
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        // Get the number of days in the previous month
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        // Create the calendar grid
        
        // Add days from previous month
        for (let i = firstDay - 1; i >= 0; i--) {
            const day = document.createElement('div');
            day.classList.add('calendar-day', 'other-month');
            day.textContent = daysInPrevMonth - i;
            calendarGrid.appendChild(day);
        }
        
        // Add days for current month
        const today = new Date();
        const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
        
        for (let i = 1; i <= daysInMonth; i++) {
            const day = document.createElement('div');
            day.classList.add('calendar-day');
            day.textContent = i;
            
            // Check if this day is today
            if (isCurrentMonth && i === today.getDate()) {
                day.classList.add('today');
            }
            
            // Check if this day has an event
            const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            if (eventDates.includes(dateString)) {
                day.classList.add('has-event');
            }
            
            calendarGrid.appendChild(day);
        }
        
        // Add days from next month to fill the grid
        const totalDaysAdded = firstDay + daysInMonth;
        const remainingDays = 7 - (totalDaysAdded % 7);
        
        if (remainingDays < 7) {
            for (let i = 1; i <= remainingDays; i++) {
                const day = document.createElement('div');
                day.classList.add('calendar-day', 'other-month');
                day.textContent = i;
                calendarGrid.appendChild(day);
            }
        }
    }
    
    // Initialize calendar
    if (calendarGrid) {
        generateCalendar(currentMonth, currentYear);
        
        // Previous month button
        if (prevMonthBtn) {
            prevMonthBtn.addEventListener('click', function() {
                currentMonth--;
                if (currentMonth < 0) {
                    currentMonth = 11;
                    currentYear--;
                }
                generateCalendar(currentMonth, currentYear);
            });
        }
        
        // Next month button
        if (nextMonthBtn) {
            nextMonthBtn.addEventListener('click', function() {
                currentMonth++;
                if (currentMonth > 11) {
                    currentMonth = 0;
                    currentYear++;
                }
                generateCalendar(currentMonth, currentYear);
            });
        }
    }
    
    // Add animation to stats cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * index);
    });
    
    // Add animation to event cards
    const animateEventCards = () => {
        eventCards.forEach((card, index) => {
            if (card.style.display !== 'none') {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.transition = 'all 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100 * index);
            }
        });
    };
    
    animateEventCards();
    
    // Re-animate cards when filter changes
    if (eventFilter) {
        eventFilter.addEventListener('change', animateEventCards);
    }
});