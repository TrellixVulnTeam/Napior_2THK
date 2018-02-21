FROM alpine:3.7

RUN apk update \
    && apk add --update nodejs nodejs-npm \
    && apk add python3-dev \
    && apk add --no-cache gcc musl-dev \
    && apk add nginx
RUN mkdir /tmp/nginx
RUN chown -R nginx /var/lib/nginx
RUN mkdir /run/nginx
COPY ./prod-nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/src/app
RUN npm i -g @angular/cli@1.7.0 --silent
COPY ./Server-Napior/requirements.txt requirements.txt
RUN pip3 install -r requirements.txt
COPY . .
ARG ng_arg=prod
ENV ng_env $ng_arg

CMD if [ $ng_env = prod ]; \
    then \
    echo "Building Angular application for production..." \
    && cd /usr/src/app/Client-Napior \
    && ng build --aot -prod \
    && mkdir -p /usr/src/build \
    && cd /usr/src/build \
    && cp -r /usr/src/app/Client-Napior/dist /usr/src/build \
    && nginx \
    & cd /usr/src/app/Server-Napior \
    && python3 manage.py runserver 0.0.0.0:8081; \
  
    else \
    echo "Serving Angular application with the Angular CLI..." \
    && nginx \
    & cd /usr/src/app/Client-Napior \
    && ng serve --aot --host 0.0.0.0 --port 8082 --disable-host-check \
    & cd /usr/src/app/Server-Napior \
    && python3 manage.py runserver 0.0.0.0:8081; \
    fi

EXPOSE 8080 8080