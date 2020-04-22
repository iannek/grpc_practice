from concurrent import futures
import grpc

import sample_pb2
import sample_pb2_grpc

import json
import mysql.connector as mydb
import datetime


class Greeter(sample_pb2_grpc.GreeterServicer):
    def ReturnTemparature(self, request, context):
        conn = mydb.connect(
            host='mysql',
            port='3306',
            user='root',
            password='root',
            database='test_database'
        )
        conn.ping(reconnect=True)
        print(conn.is_connected())

        cur = conn.cursor()
        cur.execute("SELECT * FROM  highest_temperature")

        data_list = cur.fetchall()
        response_json = []
        for data in data_list:
            temperature_data = {"date": data[0].strftime('%Y/%m/%d'), "high_temperature": data[1], "place": data[3]}
            response_json.append(temperature_data)

        return sample_pb2.TemparatureReply(temparatures=response_json)

if __name__ == "__main__":
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    sample_pb2_grpc.add_GreeterServicer_to_server(Greeter(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()