import { defineStore } from "pinia";

export const useRouteList = defineStore("routeList", {
    state: () => ({
        routeList: [],
        isColumnsMenuHover: false,
        isColumnsNavHover: false
    }),
    actions: {
        async setRoutesList(data) {
            this.routeList = data;
        },
        async setColumnsMenuHover(bool) {
            this.isColumnsMenuHover = bool;
        },
        async setColumnsNavHover(bool) {
            this.isColumnsNavHover = bool;
        },
    }
})