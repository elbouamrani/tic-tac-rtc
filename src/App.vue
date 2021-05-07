<template>
    <div id="app">
        <div>
            <span>You are : {{ iam }}</span>
            &nbsp;|&nbsp;
            <span>Turn is : {{ tictacengine && tictacengine.turn }}</span>
        </div>
        <div>
            <button @click="joinRoom()">join</button>
            &nbsp;|&nbsp;
            <button @click="gridStart()">start</button>
            &nbsp;|&nbsp;
            <button @click="gridReset()">reset</button>
        </div>
        <hr />
        <div v-if="tictacengine">
            <Grid :data="tictacengine.grid" @cellClick="handleCellClick" />
        </div>
    </div>
</template>

<script>
import Grid from "./components/Grid";

import RTCService from "./services/RTCService";
import TicTacEngine from "./services/TicTacEngine";

export default {
    name: "App",
    components: {
        Grid,
    },
    data() {
        return {
            roomName: "tic-tac-rtc",
            tictacengine: null,
            rtcservice: null,
            iam: "X",
            callbacks: {
                start: (payload) => {
                    this.iam = payload.iam === "O" ? "X" : "O";
                },
                move: (payload) => {
                    this.tictacengine.move(
                        payload.player,
                        payload.coords[0],
                        payload.coords[1]
                    );
                },
                reset: () => {
                    this.tictacengine.reset();
                },
            },
        };
    },
    methods: {
        handleCellClick(coords) {
            this.tictacengine.move(this.iam, coords[0], coords[1]);
            this.rtcservice.broadcastMessage({
                type: "move",
                payload: {
                    player: this.iam,
                    coords: coords,
                },
            });
        },
        gridReset() {
            this.tictacengine.reset();
            console.log("this.rtcservice.broadcastMessage");
            this.rtcservice.broadcastMessage({
                type: "reset",
            });
        },
        joinRoom() {
            this.rtcservice.openOrJoin(this.roomName);
        },
        gridStart() {
            this.rtcservice.broadcastMessage({
                type: "start",
                payload: {
                    iam: this.iam,
                },
            });
        },
    },
    mounted() {
        this.tictacengine = TicTacEngine.setup();
        this.rtcservice = RTCService.setup(this.callbacks);
    },
};
</script>