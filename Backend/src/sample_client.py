from __future__ import print_function
import logging

import grpc

import sample_pb2
import sample_pb2_grpc


def run():
    with grpc.insecure_channel('localhost:80') as channel:
        stub = sample_pb2_grpc.GreeterStub(channel)
        response = stub.SayHello(sample_pb2.TemparatureRequest())
#        response = stub.SayHello.with_call(
#            sample_pb2.TemparatureRequest(),
#            metadata=(
#                ('authorization', 'Basic YWRtaW46YWRtaW4='),
#            ))

    for a in response.temparatures:
        print(a)

if __name__ == '__main__':
    logging.basicConfig()
    run()