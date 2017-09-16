class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config) {
            this._config = config;
            this._state = config.initial;
            this._stateHistory = [];
            this._replacedStates = [];
        } else {
            throw new Error("config isn't passed");
        }
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this._state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        
        if (state in this._config.states) {
            this._stateHistory.push(this._state);
            this._state = state;
            this._replacedStates = [];
        } else {
            throw new Error("invalid state");
        }
        
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        if (event in this._config.states[this._state].transitions) {
            this.changeState(this._config.states[this._state].transitions[event]);
            this._replacedStates = [];
        } else {
            throw new Error("thera are no such event in state " + this._state);
        }
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this._state = this._config.initial;
        this._stateHistory = [];
        this._replacedStates = [];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        let result = [];
        if (event) {
            for (let state in this._config.states) {
                if (event in this._config.states[state].transitions) {
                    result.push(state);
                }
            }
        } else {
            for (let state in this._config.states) {
                result.push(state);
            }
        }
        return result;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this._stateHistory.length) {
            this._replacedStates.push(this._state);
            this._state = this._stateHistory.pop();
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this._replacedStates.length) {
            this._stateHistory.push(this._state);
            this._state = this._replacedStates.pop();
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this._stateHistory = [];
    }
}

module.exports = FSM;

/** 
 * @Created by Uladzimir Halushka 
 * @Implemented by Sergey Shmaro
 */
