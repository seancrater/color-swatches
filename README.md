# Color Swatches Take Home Exercise

## How To Run
You'll need Node v22.12 or greater installed on your machine to run this app. From there, you'll want to set your current directory to the top level directory of this project and run `npm install` and then `npm run dev` to serve it locally at `http://localhost:5173`.

## Architectural Decisions
I chose to use Vite to quickly scaffold a Vue + TypeScript project for this. Since we're using a third party API, I wanted to leverage TypeScript to enforce a contract as far as what we could expect the response shape to look like (although this contract could break at any time as the API may shift over time).

The decision to use Vue was because we'll need to have the UI react to changes in the application state (HSL values as well as API response values). There are plenty of frontend frameworks (e.g. React) that have this same behavior but Vue also aligns the most with the role and I have plenty of experience using it.

Most of the heavy lifting for the fetching logic is in `utils/fetch.ts`, I left a fair amount of comments to hopefully make it easier to walk the code and understand how I thought about reducing the server load while maintaining functionality.

Since this API has a rapid response time, I chose to implement a quick skeleton indicator during loads and I've also added a memory cache mechanism to prevent making duplicate requests when we've already fetched a particular saturation/lightness pairing. In favor of keeping it simple, I just made one big batch of requests since that way the application only needs to re-render once when we've received a new batch of colors to render.

One consideration I'd had that I hadn't implemented yet was a debounce on user input to prevent the watch from firing immediately on user input. This was for two reasons, one being that number inputs have a pretty graceful handling of change events where if the arrows to increment/decrement are held down, they don't fire change events until the keyup event. The second consideration was that the caching mechanism that I built is nested directly in the fetch function so it'd take a little refactor to get that working correctly so it didn't have a debounce delay tied to it.

Another consideration I didn't touch upon is retrying failed fetch requests if hypothetically we got rate throttled. We would probably also want graceful handling if the requests perpetually fail on retry.