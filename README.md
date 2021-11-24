# Wareh.com qualifing task

This is our boilerplate repo, a starting point for our react apps. We've added 'counter' feature just to show you our convention of the code. Your goal will be to add 'skywalkers' feature. 

Feature specs:
  - List of skywalkers family members - it should be fetched from swapi https://swapi.dev/ (https://swapi.dev/api/people/?search=Skywalker&format=json) and held in app state,
  - The list should be displayed on 'skywalkers' route,
  - User should have an ability to delete members from the list (quite harsh but it's easer than adding one) - operation should (and can) be done only on app state.
 
Our appraisal will mostly depend on how much your code sticks to the convention. We do not write about the convention itself, just to see your ability to get your head around it, look at the example (the counter feature). You can earn extra points for visual aspects.

# Development

```
nvm install 10.17.0
npm ci
npm run dev
```

# Used technologies

**React** - as frontend framework
https://reactjs.org/

**Redux-saga** - for operations on app state
https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html

**Next.js** - for server-side rendering
https://github.com/zeit/next.js/

**Material-ui** - as ui framework
https://material-ui.com/

**Typescript** - we love strongly typed languages
https://www.typescriptlang.org/docs/home.html
