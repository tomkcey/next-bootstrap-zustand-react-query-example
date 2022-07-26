FROM node:16-alpine AS build
WORKDIR /next-bootstrap-zustand-react-query-example
ENV NEXT_PUBLIC_CANONICAL_URI "http://localhost:3000"
ENV NEXT_PUBLIC_STARSHIP_ENDPOINT "/api/v1/starships"
COPY package.json yarn.lock tsconfig.json next.config.js ./
RUN ["yarn", "--frozen-lockfile"]
COPY ./styles ./styles
COPY ./public ./public
COPY ./src ./src
RUN ["yarn", "build"]
RUN cd $(yarn cache dir) && tar czf /tmp/yarn-cache.tar.gz .

FROM node:16-alpine AS web
WORKDIR /next-bootstrap-zustand-react-query-example
COPY package.json yarn.lock ./
COPY --from=build /tmp/yarn-cache.tar.gz /tmp/yarn-cache.tar.gz
RUN cd $(yarn cache dir) && tar xzf  /tmp/yarn-cache.tar.gz
ENV NODE_ENV=production
RUN ["yarn", "--production", "--frozen-lockfile"]
COPY --from=build /next-bootstrap-zustand-react-query-example/.next ./.next
COPY --from=build /next-bootstrap-zustand-react-query-example/public ./public
COPY --from=build /next-bootstrap-zustand-react-query-example/styles ./styles
CMD ["yarn", "start"]