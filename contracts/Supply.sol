// SPDX-License-Identifier: UNLICENSED

pragma solidity >=0.8.2 <0.9.0;

contract Supply {
    // USERS FUNCTIONS AND EVENTS
    struct Customer{
        string name;
        string email;
        string password;
        string role;
        address ETHAddress;
    }

    mapping (address=> Customer) customers;
    event createCustomerEvent(string name,string email,string password,string role);

    function createCustomer(string memory name,string memory email,string memory password,string memory role) public {
        require(keccak256(abi.encodePacked(customers[msg.sender].ETHAddress)) != keccak256(abi.encodePacked(msg.sender)),"Customer already exist!");
        customers[msg.sender] = Customer(name,email,password,role,msg.sender);
        emit createCustomerEvent(name,email, password, role);
    }

    function getCustomer(string memory password) public view returns (Customer memory) {
        require(keccak256(abi.encodePacked(customers[msg.sender].ETHAddress)) == keccak256(abi.encodePacked(msg.sender)),"Customer Not exist!");
        require(keccak256(abi.encodePacked(customers[msg.sender].password)) == keccak256(abi.encodePacked(password)),"Wrong password,Please Try Again!");
        return customers[msg.sender];
    }

    // FARMERS FUNCTIONS AND EVENTS
    struct Farmer{
        string name;
        string email;
        string password;
        string role;
        address ETHAddress;
    }

    mapping (address=> Farmer) farmers;
    event createFarmerEvent(string name,string email,string password,string role);

    function createFarmer(string memory name,string memory email,string memory password,string memory role) public {
        require(keccak256(abi.encodePacked(farmers[msg.sender].ETHAddress)) != keccak256(abi.encodePacked(msg.sender)),"Farmer already exist!");
        farmers[msg.sender] = Farmer(name,email,password,role,msg.sender);
        emit createFarmerEvent(name,email, password, role);
    }

    function getFarmer(string memory password) public view returns (Farmer memory) {
        require(keccak256(abi.encodePacked(farmers[msg.sender].ETHAddress)) == keccak256(abi.encodePacked(msg.sender)),"Farmer Not exist!");
        require(keccak256(abi.encodePacked(farmers[msg.sender].password)) == keccak256(abi.encodePacked(password)),"Wrong password,Please Try Again!");
        return farmers[msg.sender];
    }

    // AUTHORITIES FUNCTIONS AND EVENTS
    struct Authority{
        string name;
        string email;
        string password;
        string role;
        address ETHAddress;
    }

    mapping (address=> Authority) authority;
    event createAuthorityEvent(string name,string email,string password,string role);

    function createAuthority(string memory name,string memory email,string memory password,string memory role) public {
        require(keccak256(abi.encodePacked(authority[msg.sender].ETHAddress)) != keccak256(abi.encodePacked(msg.sender)),"Authority already exist!");
        authority[msg.sender] = Authority(name,email,password,role,msg.sender);
        emit createAuthorityEvent(name,email, password, role);
    }

    function getAuthority(string memory password) public view returns (Authority memory) {
        require(keccak256(abi.encodePacked(authority[msg.sender].ETHAddress)) == keccak256(abi.encodePacked(msg.sender)),"Authority Not exist!");
        require(keccak256(abi.encodePacked(authority[msg.sender].password)) == keccak256(abi.encodePacked(password)),"Wrong password,Please Try Again!");
        return authority[msg.sender];
    }

    struct Crop {
        string id;
        string farmerName;
        address ETHAddress;
        string cropName;
        string landAddress;
        uint256 area;
        uint256 time;
        uint256 yield;
        uint256 timeofRegister;
    }

    Crop[] crops;
    event cropRegisterEvent(string id,string farmer,string crop,string land,uint256 area,uint256 time,uint256 yield);

    function cropRegister(string memory id,string memory farmer,string memory crop,string memory land,uint256 area,uint256 time,uint256 yield ) public {
        crops.push(Crop(id,farmer,msg.sender,crop,land,area,time,yield,block.timestamp));
        emit cropRegisterEvent(id, farmer, crop, land, area, time, yield);
    }

    function getAllCropIds() public view returns (string[] memory) {
        string[] memory cropIds = new string[](crops.length);
        for (uint256 i = 0; i < crops.length; i++) {
            cropIds[i] = crops[i].id;
        }
        return cropIds;
    }

    function getCrops()public view returns (Crop[] memory){
        return crops;
    }

    struct Product{
        string id;
        string name;
        string price;
        string desc;
    }

    Product[] products;
    event createProductEvent(string id,string name,string price,string desc);

    function createProduct(string memory id,string memory name,string memory price,string memory desc) public {
        products.push(Product(id,name,price,desc));
        emit createProductEvent(id, name, price, desc);
    }

    function getAllProductIds() public view returns (string[] memory) {
        string[] memory cropIds = new string[](crops.length);
        for (uint256 i = 0; i < crops.length; i++) {
            cropIds[i] = crops[i].id;
        }
        return cropIds;
    }

    function getProducts() view public returns (Product[] memory){ 
        return products;
    }

    // MID-TERM VERIFICATION

    struct MidTerm{
        string farmerName;
        string cropName;
        string area;
        string progress;
        string timeremaining;
    }
    event midTermVerifyEvent(string farmerName,string cropName,string area,string progress,string timeremaining);
    MidTerm[] midterm;

    function midTermVerify(string memory farmerName,string memory cropName,string memory area,string memory progress,string memory timeremaining) public{
        midterm.push(MidTerm(farmerName,cropName,area,progress,timeremaining));
        emit midTermVerifyEvent(farmerName, cropName, area, progress, timeremaining);
    }

    // CERTIFICATE

    struct Certificate{
        string cropName;
        string quantity;
        string quality;
        uint256 price;
    }
    event applyCertificateEvent(string cropName,string quantity,string quality,uint256 price);
    Certificate[] certificates;

    function applyCertificate(string memory cropName,string memory quantity,string memory quality,uint256 price) public{
        certificates.push(Certificate(cropName,quantity,quality,price));
        emit applyCertificateEvent(cropName, quantity, quality, price);
    }
}