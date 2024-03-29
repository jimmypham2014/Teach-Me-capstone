import eventlet
eventlet.monkey_patch()
import boto3
import botocore
import os
import uuid
from botocore.exceptions import ClientError
from boto3.s3.transfer import TransferConfig

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f'http://{BUCKET_NAME}.s3.amazonaws.com/'
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
CONFIG = TransferConfig(use_threads=False)

s3 = boto3.client(
    "s3",
    aws_access_key_id = os.environ.get('S3_KEY'),
    aws_secret_access_key = os.environ.get('S3_SECRET')
)

def allow_file(filename):
    return '.' in filename and \
        filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f'{unique_filename}.{ext}'


def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL":acl,
                "ContentType": file.content_type
            },
            Config=CONFIG
        )
    except Exception as e:
   
        return {'errors': str(e)}

    return {'url': f'{S3_LOCATION}{file.filename}'}


def delete_file_from_s3(key):
    try:
        s3.delete_object(
            BUCKET_NAME,
            key
        )

    except Exception as e:
        return {'errors': str(e)}