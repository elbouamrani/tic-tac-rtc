<template>
    <div>
        <div class="row" v-for="(row, i) in data" :key="i">
            <div class="column" v-for="(col, j) in row" :key="j">
                <span class="cell" @click="cellClick(i, j)"> {{ col }} </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Grid",
    props: ["data"],
    methods: {
        cellClick(i, j) {
            this.$emit("cellClick", [i, j]);
        },
    },
};
</script>

<style>
.row {
    display: flex;
}

.cell {
    width: 30pt;
    height: 30pt;
    border: 1pt solid lightgray;
    display: block;
}
</style>