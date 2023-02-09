#FROM node:lts-alpine
FROM node:14.17.6-alpine3.13 as builder


RUN apk add gettext
# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

ARG NPM_AUTH_TOKEN
COPY .npmrc .npmrc

ARG TARGET
RUN export DOLLAR='$'


# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install
RUN npm --version
RUN rm -f .npmrc

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .
COPY vue.config.js ./
COPY env.template ./env.template
RUN echo "building container for environment $TARGET" 
RUN envsubst < ./env.template > /.env
RUN envsubst < ./env.template > /app/.env

RUN cp -r node_modules/@govflanders/vl-ui-util/dist/font assets/

# build app for production with minification
RUN npm run build


FROM node:14.17.6-alpine3.13 

RUN npm install -g http-server

COPY --from=builder /app/dist /app/dist
COPY --from=builder /.env /

EXPOSE 8080

ADD run.sh /run.sh
RUN chmod 755 /run.sh
CMD [ "/run.sh" ]
