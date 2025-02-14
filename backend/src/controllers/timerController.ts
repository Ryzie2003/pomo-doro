export const getTimers = (req, res) => {
    res.status(200).json({ msg: "read timers"});
}

export const getSingleTimer = (req, res) => {
    res.status(200).json({ msg: `timer with id ${req.params.id} read`});
}

export const createTimer = (req, res) => {
    res.status(201).json({ msg: `timer created`});
}

export const updateTimer = (req, res) => {
    res.status(201).json({ msg: `timer with id ${req.params.id} updated. `});
}

export const deleteTimer = (req, res) => {
    res.status(201).json({ msg: `timer with id ${req.params.id} deleted. `});
}