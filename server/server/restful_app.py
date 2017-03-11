import web
import json
import redis
from restful_controller import RESTfulController

urls = (
    r'/resources(?:/(?P<resource_id>[0-9]+))?', 'ResourceController',
    r'/getLink/(?P<link_id>[0-9]+)', 'GetLinkHandler',
    r'/updateLink', 'UpdateLinkHandler'
)

_LINK_KEYS = ["num_dangerous", "num_likes", "num_damaged"]

class UpdateLinkHandler:
    """ This controller takes the json from user to update the 
    link status in database """
    def _update_database(self, data):
        json_data = json.loads(data)
        link = "Link:"+str(json_data["link_id"])
        r = redis.StrictRedis(host='localhost', port=6379, db=0)
        if not r.hgetall(link):   # If link dose not exist in db
            r.hmset(link, {'num_dangerous':0, 'num_damaged':0, 'num_likes':0})
        for key in _LINK_KEYS:
            if json_data[key] == 1:
                r.hincrby(link, key, 1)

        
    def POST(self):
        """ Update link status """
        self._update_database(web.data())
        return web.data();

class GetLinkHandler:

    def GET(self, link_id):
        """ 
        Get link information based on the link_id
        """
        r = redis.StrictRedis(host='localhost', port=6379, db=0)
        link = "Link:"+str(link_id)
        if not r.hgetall(link):   # If link dose not exist in db
            r.hmset(link, {'num_dangerous':0, 'num_damaged':0, 'num_likes':0})
        res_dic = { "link_id": link }
        for key in _LINK_KEYS:
            res_dic[key] = r.hmget(link, key)[0]
        return json.dumps(res_dic)

class ResourceController(RESTfulController):

    def list(self):
        return "list resources", format

    def get(self, resource_id):
        return "retrieved resource", resource_id

    def create(self):
        resource = json.loads(web.data())
        return "created resource", resource

    def update(self, resource_id):
        resource = json.loads(web.data())
        return "updated resource", resource_id, resource

    def delete(self, resource_id):
        return "deleted resource", resource_id

app = web.application(urls, globals())

if __name__ == "__main__":
    app.run()
