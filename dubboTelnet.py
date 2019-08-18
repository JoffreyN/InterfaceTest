# import json
import telnetlib

class Dubbo(telnetlib.Telnet):
	prompt='dubbo>'
	coding='utf-8'
 
	def __init__(self,host=None,port=0):
		super().__init__(host,port)
		self.write(b'\n')
 
	def command(self,flag,str_=""):
		data=self.read_until(flag.encode())
		self.write(f"{str_}\n".encode())
		return data
 
	def invoke(self,service_name,method_name,param):
		command_str=f"invoke {service_name}.{method_name}({param})"
		self.command(Dubbo.prompt,command_str)
		data=self.command(Dubbo.prompt,"")
		# data=json.loads(data.decode(Dubbo.coding,errors='ignore').split('\n')[0].strip())
		data=data.decode(Dubbo.coding,errors='ignore').split('\n')[0].strip()
		return data
 
if __name__ == '__main__':
	conn=Dubbo('*',21918)
	result=conn.invoke(
		"com.bestpay.bpep.creditproduct.api.product.service.WhiteListService",
		"threeElement",
		'{"mobileNo":"*","certCode":"*","name":"*"}'
	)
	print('result:',result)