// MIT License
// Copyright (c) 2020 Luis Espino
const statesC = [0, 0, 0, 0, 0, 0, 0, 0];

const generateRandom = (min, max) => {
    return Math.random() * (max - min) + min;
};

const dirtyState = (states) => {
    let state = {
        A: "",
        B: "",
    };

    const random = Math.trunc(generateRandom(1, 7));

    if (random === 1) {
        state.A = "DIRTY";
        state.B = states[2];
    } else if (random === 2) {
        state.A = states[1];
        state.B = "DIRTY";
    } else if (random === 3) {
        state.A = "DIRTY";
        state.B = "DIRTY";
    } else {
        state.A = states[1];
        state.B = states[2];
    }
    return state;
};

const aggregateStates = (states) => {
    let element;
    if (`${states[0]}|${states[1]}|${states[2]}` === "A|DIRTY|DIRTY") {
        element = document.getElementById("quantity-1");
        element.textContent = Number(element.textContent) + 1;
        statesC[0] = statesC[0] + 1;
    } else if (`${states[0]}|${states[1]}|${states[2]}` === "B|DIRTY|DIRTY") {
        element = document.getElementById("quantity-2");
        element.textContent = Number(element.textContent) + 1;
        statesC[1] = statesC[1] + 1;
    } else if (`${states[0]}|${states[1]}|${states[2]}` === "A|DIRTY|CLEAN") {
        element = document.getElementById("quantity-3");
        element.textContent = Number(element.textContent) + 1;
        statesC[2] = statesC[2] + 1;
    } else if (`${states[0]}|${states[1]}|${states[2]}` === "B|DIRTY|CLEAN") {
        element = document.getElementById("quantity-4");
        element.textContent = Number(element.textContent) + 1;
        statesC[3] = statesC[3] + 1;
    } else if (`${states[0]}|${states[1]}|${states[2]}` === "A|CLEAN|DIRTY") {
        element = document.getElementById("quantity-5");
        element.textContent = Number(element.textContent) + 1;
        statesC[4] = statesC[4] + 1;
    } else if (`${states[0]}|${states[1]}|${states[2]}` === "B|CLEAN|DIRTY") {
        element = document.getElementById("quantity-6");
        element.textContent = Number(element.textContent) + 1;
        statesC[5] = statesC[5] + 1;
    } else if (`${states[0]}|${states[1]}|${states[2]}` === "A|CLEAN|CLEAN") {
        element = document.getElementById("quantity-7");
        element.textContent = Number(element.textContent) + 1;
        statesC[6] = statesC[6] + 1;
    } else if (`${states[0]}|${states[1]}|${states[2]}` === "B|CLEAN|CLEAN") {
        element = document.getElementById("quantity-8");
        element.textContent = Number(element.textContent) + 1;
        statesC[7] = statesC[7] + 1;
    }

    let done = true;
    for (let q of statesC) {
        if (q < 2) {
            done = false;
        }
    }

    return done;
};

const reflex_agent = (location, state) => {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
};

const test = async(states) => {
    console.log(states);
    let done = aggregateStates(states);

    if (done) {
        console.log(statesC);
        alert("All states where visited equal or more than twice.");
        return;
    }

    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);
    document.getElementById("log").innerHTML += "<br>Location: "
        .concat(location)
        .concat(" | Action: ")
        .concat(action_result);
    if (action_result == "CLEAN") {
        if (location == "A") states[1] = "CLEAN";
        else if (location == "B") states[2] = "CLEAN";
    } else if (action_result == "RIGHT") states[0] = "B";
    else if (action_result == "LEFT") states[0] = "A";
    let newState = dirtyState(states);

    states[1] = newState.A;
    states[2] = newState.B;
    setTimeout(function() {
        test(states);
    }, 2000);
};

var states = ["A", "DIRTY", "DIRTY"];
test(states);