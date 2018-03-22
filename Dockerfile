FROM alpine:3.7

# Install required alpine linux packages.
RUN apk update \
    && apk add --update nodejs nodejs-npm \
    && apk add python3-dev \
    && apk add --no-cache gcc musl-dev \
    && apk add nginx
RUN mkdir /tmp/nginx
RUN chown -R nginx /var/lib/nginx
RUN mkdir /run/nginx

# Configure app directory in container.
WORKDIR /usr/src/app
RUN npm i -g @angular/cli@1.7.0 --silent
COPY ./Server-Napior/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
WORKDIR /usr/src/app/Client-Napior

# Build application for production.
RUN ng build --aot -prod \
    && mkdir -p /usr/src/build \
    && cd /usr/src/build \
    && cp -r /usr/src/app/Client-Napior/dist /usr/src/build

#Set build arguments (i.e. production or development).
ARG ng_arg=prod
ENV ng_env $ng_arg

CMD if [ $ng_env = prod ]; \
    # Run app in production mode.
    then \
    echo "Running Napior in production mode..." \
    && cp /usr/src/app/prod-nginx.conf /etc/nginx/nginx.conf \
    && nginx \
    & cd /usr/src/app/Server-Napior \
    && cp /usr/src/app/Server-Napior/napior_api/subscriptions/prod_stripe_key.py /usr/src/app/Server-Napior/napior_api/subscriptions/stripe_key.py \
    && python3 manage.py runserver 0.0.0.0:8081; \
    # Run app in development mode.
    else \
    echo "Running Napior in development mode..." \
    && cp /usr/src/app/dev-nginx.conf /etc/nginx/nginx.conf \
    && nginx \
    & cd /usr/src/app/Client-Napior \
    && ng serve --aot --host 0.0.0.0 --port 8082 --disable-host-check \
    & cd /usr/src/app/Server-Napior \
    && cp /usr/src/app/Server-Napior/napior_api/subscriptions/dev_stripe_key.py /usr/src/app/Server-Napior/napior_api/subscriptions/stripe_key.py \
    && python3 manage.py runserver 0.0.0.0:8081; \
    fi

EXPOSE 8080 8080