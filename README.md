# Before running the program

- Make sure you have a `.env` file at root with the following key/values.

```env
NEXT_PUBLIC_CANONICAL_URI="http://localhost:3000"
NEXT_PUBLIC_STARSHIP_ENDPOINT="/api/v1/starships"
```

## Things to look for

- State management with `zustand`. See how the state is shared between two 'same-level' components (in `/pages/index.tsx`) without drilling them from above and how the "boilerplate" is in fact so small it shouldn't really be called boilerplate.
- `WrappedAxiosResponse<T>` that's in fact merely an extension of the `AxiosResponse<T>` type from `axios` to which we added the `unwrap` function that's essentially an accessor for its `data` property. It's fluff, but interesting since we won't have to potentially chain `axiosResponse.data?.data` calls which might get confusing, or even `x?.data?.data?.data` if the axios response itself was wrapped. We can merely call `axiosResponse.unwrap()` and the fetched data will be revealed. Looking forward it's possible to extract this type as straight up `Wrapper<T>` so it can be attached to other types that would have the same reasoning for accessing the required resource as `axios`.
- A bit of directory sexiness. Even this one could use a bit of love but overall it's purposeful. Take, for example, the `utils` folder, where utility functions and variables are stored. Even services/clients like the http client or the validator are stored there, but these could very well be in the `shared` folder. Talking of the `shared` folder, see how it's domain-driven and thus both the frontend and backend can pull the `Starship` models from there? There's also a `'*.test-utils.ts'` file in there. Obviously whatever is inside serves only our tests.
- `/utils/links.ts` is one take on pagination-tracking. The backend sets the `link` HTTP header and clients can parse it and simply feed that to their http client url when jumping pages. See how it's done with `react-query` in `/pages/index.tsx`, in tandem with the `zustand` state management.

# Running on machine

- `yarn`
- `yarn dev`

If weird things happen, welcome to Next.js. Just stop the program, execute `yarn build`, then execute `yarn dev` again.

# Running containerized

- `yarn docker:build`
- `yarn docker:run`

### Disclaimer

- There might be remnants/artifacts lying around that don't serve rthe purpose of the showcase. If you stumble on one, ignore it.
- The backend is basically mock/stub data. A generator function generates a bunch of starships, filters them on a need-to basis, generates the `link` header and serves the response.
