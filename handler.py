import awsiot.greengrasscoreipc
from awsiot.greengrasscoreipc.model import (
    QOS,
    PublishToIoTCoreRequest
)
import time

print("Starting")

def fce(event, context):
    print("running")
    return {}

TIMEOUT = 10

ipc_client = awsiot.greengrasscoreipc.connect()

def x():
    print("Starting X")

    topic = "my/topic"
    message = "Hello, World"
    qos = QOS.AT_LEAST_ONCE

    request = PublishToIoTCoreRequest()
    request.topic_name = topic
    request.payload = bytes(message, "utf-8")
    request.qos = qos
    operation = ipc_client.new_publish_to_iot_core()
    operation.activate(request)
    future = operation.get_response()
    future.result(TIMEOUT)

    time.sleep(5)
    x()

try:
    x()
except Exception as err:
    print(err)
except:
    print("errrrrrorrrrrr")
