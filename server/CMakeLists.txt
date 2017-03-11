
cmake_minimum_required (VERSION 2.8.8)
project (Ranking-Server)
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -std=c++11 -Wall -Wextra")

set(BOOST_COMPONENTS system thread filesystem date_time)
find_package(Boost 1.53.0 COMPONENTS ${BOOST_COMPONENTS} REQUIRED)
include_directories(SYSTEM ${Boost_INCLUDE_DIR})

include_directories(src)
add_executable(http_examples src/http_examples.cpp)
target_link_libraries(http_examples ${Boost_LIBRARIES})
