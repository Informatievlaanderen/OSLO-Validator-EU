VERSION:=`cat ../../VERSION`
PUBLISHEDIMAGE:=`cat ../../PUBLISHED`

ENVIRONMENTS=dev test prod
PUBENV=dev.pub test.pub prod.pub

build:
	docker build -f Dockerfile -t informatievlaanderen/validator-backend:${VERSION} .

run:
	docker run -it --name ba -p 8080:8080 informatievlaanderen/validator-backend:${VERSION} 

stop:
	docker stop ba
	docker rm ba


$(ENVIRONMENTS):
	docker build -f Dockerfile -t informatievlaanderen/validator-backend:$@-${VERSION} .

clean: stop
	docker rm ba || true
	docker rmi $(shell docker images -q informatievlaanderen/validator-backend ) || true

%.pub: %
	docker tag informatievlaanderen/validator-backend:$<-${VERSION} ${PUBLISHEDIMAGE}-backend:$<-${VERSION}
	docker push ${PUBLISHEDIMAGE}-backend:$<-${VERSION}

publish: ${PUBENV}

