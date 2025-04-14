Github will run the yml file anytime there is a push or pull_request.
The workflow can be inspected in tests.yml.
There are two jobs: unit-test and e2e-tests and they run in their own environments.
Altho unit-test need to pass for e2e to be tested. 
e2e will compile the whole project so it takes some time. 

*In Github*
So whenever you push, even in yourr push in actions page it will run tests.
IF some of these fail you should ask yourself why. You can click and see some logs.
For example if you change the directory structure it is more likely to test to fail because of the paths but you should debug this is the test wrong or your code wrong. 

*The test are located in*
unit-tests: backend/tests
	In auth.test.js it tests now login with wrong details and expects 401 and then registering and expects 201
	The thing is that it inits a test database and does not use the one we are using se if you are writing tests keep that in mind (for example register the user first before trying to log in). IF the testfile needs frameworks install them inside tests folder.

e2e:
	this test here is more simple. It just ignores the sec certificate and tries to connect and expects 200.


