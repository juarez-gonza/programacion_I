FROM python:3
EXPOSE 8000
WORKDIR /mysite
COPY /mysite/requirements.txt /mysite
RUN pip install -r requirements.txt
COPY /mysite/ /mysite/
ENTRYPOINT python manage.py runserver 0.0.0.0:8000
