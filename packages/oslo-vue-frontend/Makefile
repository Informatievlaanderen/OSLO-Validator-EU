VERSION:=`cat ../../VERSION`
PUBLISHEDIMAGE:=`cat ../../PUBLISHED`

ENVIRONMENTS:=local dev test prod
PUBLISHEDENV:=dev.pub test.pub prod.pub

build:
	docker build -f Dockerfile --build-arg NPM_AUTH_TOKEN=${NPM_AUTH_TOKEN} --build-arg TARGET=local -t informatievlaanderen/validator-frontend:${VERSION} .

run:
	docker run -it --name front -p 8080:8080 -v ${CURDIR}:/data informatievlaanderen/validator-frontend:${VERSION} sh

run2:
	docker run -d --name front -p 8081:8080 informatievlaanderen/validator-frontend:${VERSION} 

stop:
	docker stop front || true
	docker rm front || true

example: 
	docker exec -it front sh


$(ENVIRONMENTS): 
	docker build -f Dockerfile --build-arg NPM_AUTH_TOKEN=${NPM_AUTH_TOKEN} --build-arg TARGET=$@ -t informatievlaanderen/validator-frontend:$@-${VERSION} .

clean: stop
	docker rm front || true
	docker rmi $(shell docker images -q informatievlaanderen/validator-frontend ) || true


%.pub: %
	docker tag informatievlaanderen/validator-frontend:$<-${VERSION} ${PUBLISHEDIMAGE}-frontend:$<-${VERSION}
	docker push ${PUBLISHEDIMAGE}-frontend:$<-${VERSION}

publish: ${PUBLISHEDENV}

