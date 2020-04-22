from __future__ import print_function
import logging

import grpc

import sample_pb2
import sample_pb2_grpc


def run():
    metadata=[('authorization', 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJLV1hnOXFGYXBta0NmMzZOS25pV1FPT2NtSHpyb0JrTzRJY0VueU5obVA0In0.eyJleHAiOjE1ODczNzQ3NTIsImlhdCI6MTU4NzM3NDQ1MiwiYXV0aF90aW1lIjoxNTg3MzY5MjA4LCJqdGkiOiI2MjMwMWZhOS1iZmYwLTQ5MzMtYTE0NS1mNTQ3ZDk1YTBmZmEiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAvYXV0aC9yZWFsbXMvdGVzdCIsImF1ZCI6InRlc3QiLCJzdWIiOiIwN2ZiMTkzZC02NTBmLTQ3NWItOWRmZC1iYjk0ZmJmM2JiYTQiLCJ0eXAiOiJJRCIsImF6cCI6InRlc3QiLCJub25jZSI6ImEwYzdmNWM4LWIwNTYtNDRhNC04MDFjLTJkZWYxYzM4MzYzMCIsInNlc3Npb25fc3RhdGUiOiJiYTQwM2Q3Ny0zOWQ4LTRiMGQtOWY0MS02OTYyNDVkN2Q4ODkiLCJhY3IiOiIwIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJ0ZXN0In0.CCgtRUXY1BmC-v_tissYspbxgiy47UOqBt0aHK8BSTL2Itp2wZFGb9hE9O09f8c9PkEUfsIS-W36-YLv42CyoG38avx216ZAKwrx_3QjgT7xNvShRt4ymBQhGNG3QIJQvalDcCMri2cc0YEri2oKbnjOqYMGk53daZNFvdae6AS7axhrDElz8JRxlqcnf8y61Xs4jIEl8dHdIVH4yLb1siJn5PPy72aiPJaTL5jpNgPYcBNjJUTB1d_4EQE9vOMaGq1zrIVsgLzlCxalgaTKo-zL2FGqbt5ubm50n45NF9zl80wi7ijl_q2WBFbHSCDBqypWXgebJDu4FZI9hu8BsA')]
    with grpc.insecure_channel('localhost:10000') as channel:
        stub = sample_pb2_grpc.GreeterStub(channel)
    #    response = stub.SayHello(sample_pb2.TemparatureRequest())
        response, call = stub.SayHello.with_call(
            request=sample_pb2.TemparatureRequest(),
            metadata=metadata
            )

    for a in response.temparatures:
        print(a)

if __name__ == '__main__':
    logging.basicConfig()
    run()