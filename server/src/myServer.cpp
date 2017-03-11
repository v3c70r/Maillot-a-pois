#include "server_http.hpp"
#include <memory>
#include <thread>
#include <chrono>

typedef SimpleWeb::Server<SimpleWeb::HTTP> HttpServer;
int main()
{
    SimpleWeb::Server<SimpleWeb::HTTP> server;
    server.config.port = 8000;
    server.resource[""]["GET"] = [](
        std::shared_ptr<HttpServer::Response> response,
        std::shared_ptr<HttpServer::Request> request) {
        auto content = request->content.string();
        *response << "HTTP/1.1 200 OK\r\nContent-Length: " << content.length() << "\r\n\r\n" << content;
    };
    std::thread server_thread([&server](){
        //Start server
        server.start();
    });
    //Wait for server to start so that the client can connect
    std::this_thread::sleep_for(std::chrono::seconds(1));
    server_thread.join();
}
