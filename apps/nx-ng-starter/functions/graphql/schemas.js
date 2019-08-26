/**
 * GraphQL schema module.
 */

exports.owner = `
  type Profile {
    id: ID!
    email: String
    role: String
    lastName: String
    firstName: String
    companyName: String
  }
  type Carrier {
    email: String,
    id: ID!,
    role: String,
    lastName: String,
    firstName: String,
    companyName: String
  }
  enum OrderAllocationType {
    SIMPLE_ALLOCATION
    AUCTION_ALLOCATION
  }
  type CarrierContractType {
    id: ID!,
    carrierOrganization: CarrierOrganizationType!,
    contractNumber: String!,
    startDate: String!,
    endDate: String!,
    isArchived: Boolean!,
    cargoQuantity: Int,
    loadingPlaces: [StoragePointType],
    unloadingPlaces: [StoragePointType],
    cargoTypes: [CargoTypeType]
  }
  type CarrierOrganizationType {
    id: ID!,
    name: String!,
    about: String,
    phoneNumber: String,
    email: String,
    status: String,
    contracts: [CarrierContractType]
  }
  type VehicleTypeType {
    id: ID!,
    name: String!
  }
  type LoadingTypeType {
    id: ID!,
    name: String!
  }
  enum CargoTypePackagingType {
    PALLETS
    BOXES
    BUNDLES
    PLACER
  }
  type CargoTypeType {
    id: ID!
    name: String,
    cargoOwner: CarrierOrganizationType,
    defaultWeight: Float,
    defaultVolume: Float,
    typeVehicle: VehicleTypeType,
    packagingType: CargoTypePackagingType,
    numberCargoPackages: Int,
    lengthCargoPackage: Float,
    widthCargoPackage: Float,
    heightCargoPackage: Float,
    permittedLoadingTypes: [LoadingTypeType],
    isArchived: Boolean
  }
  type StoragePointType {
    id: ID!
    cargoOwner: CarrierOrganizationType
    pointName: String
    settlement: String!
    companyName: String!
    address: String!
    workingHoursFrom: String!
    workingHoursTo: String!
    loadingTypes: [LoadingTypeType]
    drivingDirectionsImg: String
    typePoint: String!
    isArchived: Boolean!
    name: String
  }
  type Order {
    id: ID!,
    loadingPlace: StoragePointType,
    unloadingPlace: StoragePointType,
    volume: String,
    status: String,
    carrier: Carrier,
    cargoType: CargoTypeType,
    loadingDate: String,
    unloadingDate: String,
    createdDatetime: String,
    lastModifiedDatetime: String,
    transportReservedDatetime: String,
    contractAttachedDatetime: String,
    readyToGoDatetime: String,
    allocationType: OrderAllocationType!,
    trailerInfo: String,
    driverInfo: String,
    truckInfo: String,
    price: String,
    weight: String,
    comment: String
  }
  type AuctionLot {
    id: ID!
    order: Order!
    startDatetime: String!
    endDatetime: String!
    startPrice: Int!
    minStepPrice: Int!
    lastBet: Int
    lastBetCarrier: Carrier
    lastBetDatetime: String
    enableNotifications: Boolean
    auctionStatus: String
  }
  type AuctionOrder {
    id: ID!,
    loadingPlace: StoragePointType,
    unloadingPlace: StoragePointType,
    volume: String,
    status: String,
    carrier: Carrier,
    cargoType: CargoTypeType,
    loadingDate: String,
    unloadingDate: String,
    createdDatetime: String,
    lastModifiedDatetime: String,
    transportReservedDatetime: String,
    contractAttachedDatetime: String,
    readyToGoDatetime: String,
    allocationType: OrderAllocationType!,
    trailerInfo: String,
    driverInfo: String,
    truckInfo: String,
    price: String,
    weight: String,
    comment: String,
    lot: AuctionLot!
  }
  type Query {
    profile: Profile,
    orders(status: String, status_In: [String], first: Int, offset: Int): [Order],
    order(id: ID!): Order,
    auctionOrders(status: String, status_In: [String], first: Int, offset: Int): [AuctionOrder],
    auctionOrder(id: ID!): AuctionOrder,
    myOrders(first: Int, offset: Int): [Order],
    lots: [AuctionLot],
    lot(id: ID!): AuctionLot,
    carriers: [Carrier],
    carrier(id: ID!): Carrier,
    loadingPlaces: [StoragePointType],
    loadingPlace(id: ID!): StoragePointType,
    unloadingPlaces: [StoragePointType],
    unloadingPlace(id: ID!): StoragePointType,
    cargoTypes: [CargoTypeType],
    cargoType(id: ID!): CargoTypeType,
    loadingTypes: [LoadingTypeType],
    carrierOrganizations(withContracts: Boolean): [CarrierOrganizationType],
    carrierOrganization(id: ID!): CarrierOrganizationType,
    vehicleTypes: [VehicleTypeType],
  }
  input CarrierInput {
    email: String,
    role: String,
    lastName: String,
    firstName: String,
    companyName: String
  }
  input AddOrderInput {
    loadingPlace: ID!,
    unloadingPlace: ID!,
    volume: String,
    status: String,
    carrier: CarrierInput,
    cargoType: String,
    loadingDate: String,
    price: String,
    weight: String,
    comment: String
  }
  type AddOrder {
    order: Order
  }
  input CargoTypeInput {
    typeVehicle: ID!,
    name: String!,
    defaultWeight: Float,
    defaultVolume: Float,
    packagingType: CargoTypePackagingType,
    numberCargoPackages: Int,
    lengthCargoPackage: Float,
    widthCargoPackage: Float,
    heightCargoPackage: Float,
    permittedLoadingTypes: [ID]
  }
  input EditCargoTypeInput {
    typeVehicle: ID!,
    name: String!,
    defaultWeight: Float,
    defaultVolume: Float,
    packagingType: CargoTypePackagingType,
    numberCargoPackages: Int,
    lengthCargoPackage: Float,
    widthCargoPackage: Float,
    heightCargoPackage: Float,
    permittedLoadingTypes: [ID],
    id: ID!
  }
  input EditCarrierContractTypeInput {
    id: ID!,
    carrierOrganization: ID,
    contractNumber: String,
    startDate: String,
    endDate: String,
    cargoQuantity: Int,
    loadingPlaces: [ID],
    unloadingPlaces: [ID],
    cargoTypes: [ID]
  }
  input CarrierContractTypeInput {
    carrierOrganization: ID!
    contractNumber: String!
    startDate: String!
    endDate: String!
    cargoQuantity: Int,
    loadingPlaces: [ID],
    unloadingPlaces: [ID],
    cargoTypes: [ID]
  }
  input LoadingUnloadingPlaceInput {
    pointName: String,
    settlement: String,
    companyName: String,
    address: String,
    workingHoursFrom: String,
    workingHoursTo: String,
    loadingTypes: [ID],
    typePoint: String
  }
  input EditLoadingUnloadingPlaceInput {
    pointName: String,
    settlement: String,
    companyName: String,
    address: String,
    workingHoursFrom: String,
    workingHoursTo: String,
    loadingTypes: [ID],
    typePoint: String,
    id: ID!
  }
  type Mutation {
    addOrder(input: AddOrderInput!): AddOrder,
    cancelOrder(orderId: ID!): Order,
    assignCarrier(carrierId: ID!, orderId: ID!): Order,
    sendCargoTypeToArchive(cargoTypeId: ID!): CargoTypeType,
    addCargoType(input: CargoTypeInput!): CargoTypeType,
    editCargoType(input: EditCargoTypeInput!): CargoTypeType,
    editCarrierContract(input: EditCarrierContractTypeInput): CarrierContractType,
    addCarrierContract(input: CarrierContractTypeInput): CarrierContractType,
    sendCarrierContractToArchive(carrierContractId: ID!): CarrierContractType
    addLoadingUnloadingPlace(input: LoadingUnloadingPlaceInput): StoragePointType,
    editLoadingUnloadingPlace(input: EditLoadingUnloadingPlaceInput): StoragePointType,
    sendLoadingUnloadingPlaceToArchive(storagePointId: ID!): StoragePointType
  }
`;

exports.carrier = `
  type Profile {
    id: ID!
    email: String
    role: String
    lastName: String
    firstName: String
    companyName: String
  }
  type Carrier {
    email: String,
    id: ID!,
    lastName: String,
    firstName: String,
    companyName: String
  }
  type LoadingPlace {
    id: ID!,
    name: String,
    address: String!,
    companyName: String!,
    settlement: String,
    workingHoursFrom: String!,
    workingHoursTo: String!
  }
  type UnloadingPlace {
    id: ID!,
    name: String,
    address: String!,
    companyName: String!,
    settlement: String,
    workingHoursFrom: String!,
    workingHoursTo: String!
  }
  enum OrderAllocationType {
    SIMPLE_ALLOCATION
    AUCTION_ALLOCATION
  }
  type Order {
    id: ID!,
    loadingPlace: LoadingPlace,
    unloadingPlace: UnloadingPlace,
    volume: String,
    status: String,
    carrier: Carrier,
    cargoType: String,
    loadingDate: String,
    unloadingDate: String,
    createdDatetime: String,
    lastModifiedDatetime: String,
    transportReservedDatetime: String,
    contractAttachedDatetime: String,
    readyToGoDatetime: String,
    allocationType: OrderAllocationType!,
    trailerInfo: String,
    driverInfo: String,
    truckInfo: String,
    price: String,
    weight: String,
    comment: String
  }
  type AuctionLot {
    id: ID!
    order: Order!
    startDatetime: String!
    endDatetime: String!
    startPrice: Int!
    minStepPrice: Int!
    lastBet: Int
    lastBetCarrier: Carrier
    lastBetDatetime: String
    isLastBetMine: Boolean
    enableNotifications: Boolean
    auctionStatus: String
  }
  type AuctionOrder {
    id: ID!,
    loadingPlace: LoadingPlace,
    unloadingPlace: UnloadingPlace,
    volume: String,
    status: String,
    carrier: Carrier,
    cargoType: String,
    loadingDate: String,
    unloadingDate: String,
    createdDatetime: String,
    lastModifiedDatetime: String,
    transportReservedDatetime: String,
    contractAttachedDatetime: String,
    readyToGoDatetime: String,
    allocationType: OrderAllocationType!,
    trailerInfo: String,
    driverInfo: String,
    truckInfo: String,
    price: String,
    weight: String,
    comment: String,
    lot: AuctionLot!
  }
  type Query {
    profile: Profile,
    orders(status: String, status_In: [String], first: Int, offset: Int): [Order],
    order(id: ID!): Order,
    auctionOrders(status: String, status_In: [String], first: Int, offset: Int): [AuctionOrder],
    auctionOrder(id: ID!): AuctionOrder,
    myOrders(first: Int, offset: Int): [Order],
    lots: [AuctionLot],
    lot(id: ID!): AuctionLot,
    carriers: [Carrier],
    carrier(id: ID!): Carrier,
    loadingPlaces: [LoadingPlace],
    loadingPlace(id: ID!): LoadingPlace,
    unloadingPlaces: [UnloadingPlace],
    unloadingPlace(id: ID!): UnloadingPlace
  }
  type Mutation {
    acceptOrder(orderId: ID!): Order,
    cancelOrder(orderId: ID!): Order,
    completeOrder(orderId: ID!): Order
  }
`;
