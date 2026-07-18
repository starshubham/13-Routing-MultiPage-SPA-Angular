import { Routes } from "@angular/router";
import { canLeaveEditPage, NewTaskComponent } from "../tasks/new-task/new-task.component";
import { resolveUserTasks, TasksComponent } from "../tasks/tasks.component";

export const routes: Routes = [
    {
        path: '', // <your-domain>/users/<uid>/
        redirectTo: 'tasks',
        pathMatch: 'full'
    },
    {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        component: TasksComponent,
        // loadComponent: () => 
        //     import('../tasks/tasks.component').then(mod => mod.TasksComponent),
        runGuardsAndResolvers: 'always',
        resolve: {
            userTasks: resolveUserTasks,
        },
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent, // <your-domain>/users/<uid>/tasks/new
        canDeactivate: [canLeaveEditPage]
    }
]