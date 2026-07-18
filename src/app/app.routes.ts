import { CanMatchFn, RedirectCommand, Route, Router, Routes, UrlSegment } from "@angular/router";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { resolveTitle, resolveUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { inject } from "@angular/core";

const dummyCanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
    const router = inject(Router);
    const shouldGetAccess = Math.random();
    if (shouldGetAccess < 1) {
        return true;
    }
    return new RedirectCommand(router.parseUrl('/unauthorized'));
}

export const routes: Routes = [
    {
        path: '', // <your-domain>/
        component: NoTaskComponent,
        // redirectTo: '/users/u1',
        // pathMatch: 'full'
        title: 'No task selected'
    },
    { 
        path: 'users/:userId', // <your-domain>/users/<uid>
        component: UserTasksComponent,
        loadChildren: () => import('./users/users.routes').then(mod => mod.routes),
        canMatch: [dummyCanMatch],
        data: {
            message: 'Hello!'
        },
        resolve: { 
            userName: resolveUserName
        },
        title: resolveTitle
    },
    {
        path: '**', // <your-domain>/*
        component: NotFoundComponent,
    }
]