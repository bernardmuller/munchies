FROM golang:1.22.0-bookworm

WORKDIR /app

ARG POSTGRES_URI

ENV POSTGRES_URI=$POSTGRES_URI

COPY ../../go.mod ../../go.sum ./
RUN go mod download

COPY . ./

RUN cd services/munchies-monolith && CGO_ENABLED=0 GOOS=linux go build -o /plants-service

EXPOSE 8001
EXPOSE 9001

CMD ["/plants-service"]
