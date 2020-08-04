import GetAgentStatusComponent from "./agent/components/GetAgentStatusComponent";
const route = {
    GetAgentStatusComponent: {
        component: GetAgentStatusComponent,
        title: "وضعیت ویندوز سرویس ها",
        path: "/main/monitoring/agentStatus/agent",
        back: null,
        add: null,
       edit : null,
        icon: 'fas fa-chart-bar'
    }
}

export default route;

