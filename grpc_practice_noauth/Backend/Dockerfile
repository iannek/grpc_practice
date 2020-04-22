FROM python:slim
RUN apt-get update
RUN pip3 install --upgrade pip
RUN mkdir /app
COPY src/ /app
RUN pip3 install -r /app/requirements.txt
WORKDIR /app