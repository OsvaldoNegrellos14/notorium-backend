/api/users/create
        {name, lastname, username, email, password}
/api/users/get/all
/api/users/get/:userId


/api/notes/create
        {title, description, userId}
/api/notes/get/all/:userId
/api/notes/get/:noteId
/api/notes/update/:noteId
/api/notes/delete/:noteId/:userId


/api/reminders/
    create
            {title, description, rememberDate, userId}
    get/all/:userId
    get/:reminderId
    update/:reminderId
    delete/:reminderId/:userId


/api/schedule/
    create
            {activityDate, title, description, urls, repeat, userId}
    get/all/:userId
    get/:scheduleId
    update/:scheduleId
    delete/:scheduleId/:userId


/api/routine/
    create
            {name, description, userId}
    get/all/:userId
    get/:routineId
    update/:routineId
    delete/:routineId/:userId


/api/exercise/
    create
            {name, duration, description, routineId}
    get/all/:userId
    get/:exerciseId
    update/:exerciseId
    delete/:exerciseId/:userId


/api/pomodoro/history/
    create
            {name, duration, restDuration, timeFormat, category, userId}
    get/all/:userId
    get/:historyPomodoroId
    update/:historyPomodoroId
    delete/:historyPomodoroId/:userId


/api/task/
    create
            {name, description, timeAprox, historyPomodoroId}
    get/all/:historyPomodoroId
    get/:taskId
    update/:taskId
    delete/:taskId/:historyPomodoroId