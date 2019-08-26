/**
 * GraphQL resolvers module.
 */

const { GraphQLError } = require('graphql');

/**
 * Returns random counter value.
 * @param {Number} from min value
 * @param {Number} to max value
 * @param {Number} fixedFactor fixed factor
 */
const getRandomCounterValue = require('../helpers/general-utils').getRandomCounterValue;

/**
 * Queries.
 */

/**
 * Returns balance.
 */
const getBalance = () => new Object({
  organization: 'name',
  sum1: getRandomCounterValue(),
  sum2: getRandomCounterValue(),
  sum3: getRandomCounterValue(),
  sum4: getRandomCounterValue()
});

/**
 * Returns catalogue.
 */
const getCatalogue = () => Array.apply(null, Array(5)).map(String.prototype.valueOf, 'catalogue item ').map((item, index) => item + index);

/**
 * Returns user profile.
 */
const getProfile = () => new Object({
  id: 'ID-0',
  email: 'dummy@email.com',
  role: 'carrier',
  lastName: 'Last name',
  firstName: 'First name',
  companyName: 'Company name'
});

/**
 * Possible order statuses.
 */
const orderStatus = {
  free: 'FREE',
  assigned: 'ASSIGNED',
  transport: 'TRANSPORT_RESERVED',
  contract: 'CONTRACT_ATTACHED',
  ready: 'READY_TO_GO',
  completed: 'COMPLETED',
  cancelled: 'CANCELED'
};

/**
 * Default order object.
 * @param auction if order is of auction type
 */
const orderObj = (auction) => new Object({
  id: 0,
  loadingPlace: placeObj(true),
  unloadingPlace: placeObj(),
  volume: '',
  status: orderStatus.free,
  carrier: {
    email: 'user@email',
    id: 0,
    lastName: 'last name ',
    firstName: 'first name ',
    companyName: 'company '
  },
  cargoType: {
    id: 0,
    name: 'type '
  },
  trailerInfo: 'trailer info',
  driverInfo: 'driver info',
  truckInfo: 'truck info',
  loadingDate: new Date().toISOString(),
  unloadingDate: new Date().toISOString(),
  createdDatetime: new Date().toISOString(),
  lastModifiedDatetime: new Date().toISOString(),
  transportReservedDatetime: new Date().toISOString(),
  contractAttachedDatetime: new Date().toISOString(),
  readyToGoDatetime: new Date().toISOString(),
  allocationType: (auction) ? 'AUCTION_ALLOCATION' : 'SIMPLE_ALLOCATION',
  price: getRandomCounterValue(),
  weight: getRandomCounterValue(),
  comment: 'comment-'
});

/**
 * Default lot object.
 */
const lotObject = () => new Object({
  id: 'lot-',
  order: orderObj(true),
  startDatetime: new Date().toISOString(),
  endDatetime: new Date(new Date().getTime() + 100000000).toISOString(),
  startPrice: 0,
  minStepPrice: 0,
  lastBet: 0,
  lastBetCarrier: carrierObj(),
  lastBetDatetime: new Date().toISOString(),
  enableNotifications: true,
  auctionStatus: 'ACTIVE'
});

/**
 * Default auction order object.
 */
const auctionOrderObj = () => new Object({
  id: 0,
  loadingPlace: placeObj(true),
  unloadingPlace: placeObj(),
  volume: '',
  status: orderStatus.free,
  carrier: {
    email: 'user@email',
    id: 0,
    lastName: 'last name ',
    firstName: 'first name ',
    companyName: 'company '
  },
  cargoType: {
    id: 0,
    name: 'type '
  },
  trailerInfo: 'trailer info',
  driverInfo: 'driver info',
  truckInfo: 'truck info',
  loadingDate: new Date().toISOString(),
  unloadingDate: new Date().toISOString(),
  createdDatetime: new Date().toISOString(),
  lastModifiedDatetime: new Date().toISOString(),
  transportReservedDatetime: new Date().toISOString(),
  contractAttachedDatetime: new Date().toISOString(),
  readyToGoDatetime: new Date().toISOString(),
  allocationType: 'AUCTION_ALLOCATION',
  lot: lotObject(true),
  price: getRandomCounterValue(),
  weight: getRandomCounterValue(),
  comment: 'comment-'
});

/**
 * Returns orders list.
 * @param role supported values: carrier; results in different object model
 * @param status request parameter, indicates status value that should be used to filter orders
 * @param status_In request parameter, array of statuses that should be used to filter orders
 * @param first paginator param - how many items after offset should be returned
 * @param offset paginator param - how many items should be passed befor returning first N items
 */
const getOrders = (role, status, status_In, first, offset) => {

  // console.log('getOrders: status', status, 'status_In', status_In);

  let orders = Array.apply(null, Array(50)).map((item, index) => {
    item = orderObj();
    item.id = index;
    let itemStatus = orderStatus.free;
    switch (index) {
      case 0:
        itemStatus = orderStatus.assigned;
        break;
      case 1:
        itemStatus = orderStatus.transport;
        break;
      case 2:
        itemStatus = orderStatus.contract;
        break;
      case 3:
        itemStatus = orderStatus.ready;
        break;
      case 4:
        itemStatus = orderStatus.completed;
        break;
      case 5:
        itemStatus = orderStatus.cancelled;
        break;
      default:
        break;
    }
    item.status = itemStatus;
    item.loadingPlace.id = index;
    item.loadingPlace.name += index;
    item.unloadingPlace.id = index;
    item.unloadingPlace.name += index;
    item.volume += getRandomCounterValue();
    item.carrier.email += index;
    item.carrier.role += index;
    item.carrier.lastName += index;
    item.carrier.firstName += index;
    item.carrier.companyName += index;
    if (role === 'carrier') {
      item.cargoType = `item name ${index}`
    } else {
      item.cargoType.id = index;
      item.cargoType.name += index;
    }
    item.loadingDate = new Date().toISOString();
    item.unloadingDate = new Date().toISOString();
    item.createdDatetime = new Date().toISOString();
    item.lastModifiedDatetime = new Date().toISOString();
    item.transportReservedDatetime = new Date().toISOString();
    item.contractAttachedDatetime = new Date().toISOString();
    item.readyToGoDatetime = new Date().toISOString();
    item.price += getRandomCounterValue();
    item.weight += getRandomCounterValue();
    item.comment += index;
    return item;
  });

  // console.log('getOrders', orders);

  const filterByStatusIn = (!status_In || !Array.isArray(status_In)) ? false : status_In.length ? true : false;
  const filterByStatus = status && typeof status === 'string' && status !== 'null';

  // console.log('filterByStatusIn', filterByStatusIn, 'filterByStatus', filterByStatus);

  if (filterByStatusIn || filterByStatus) {
    orders = orders.filter((item) => {
      let result = false;
      if (filterByStatusIn) {
        result = status_In.indexOf(item.status) !== -1;
        // console.log('item', item.status, '| status_In', status_In, '| result', result);
      } else if (filterByStatus) {
        result = (item.status === status) ? true : false;
        // console.log('item', item.status, '| status', status, '| result', result);
      }
      return result;
    });
  }

  // console.log('orders filtered', orders);

  if (first > 0 && offset >= 0) {
    orders = orders.slice(offset, offset + first);
  }

  return orders;
}

/**
 * Gets order by id
 * @param {String} id order id
 * @param role supported values: carrier; results in different object model
 */
const getOrder = (id, role) => getOrders(role).find(item => {
  if (role === 'carrier') {
    item.cargoType = `item name ${id}`
  }
  return item.id == id;
});

/**
 * Returns auction orders list.
 * @param role supported values: carrier; results in different object model
 * @param status request parameter, indicates status value that should be used to filter orders
 * @param status_In request parameter, array of statuses that should be used to filter orders
 * @param first paginator param - how many items after offset should be returned
 * @param offset paginator param - how many items should be passed befor returning first N items
 */
const getAuctionOrders = (role, status, status_In, first, offset) => {

  // console.log('getAuctionOrders: status', status, 'status_In', status_In);

  let auctionOrders = Array.apply(null, Array(50)).map((item, index) => {
    item = auctionOrderObj();
    item.id = index;
    let itemStatus = orderStatus.free;
    switch (index) {
      case 0:
        itemStatus = orderStatus.assigned;
        break;
      case 1:
        itemStatus = orderStatus.transport;
        break;
      case 2:
        itemStatus = orderStatus.contract;
        break;
      case 3:
        itemStatus = orderStatus.ready;
        break;
      case 4:
        itemStatus = orderStatus.completed;
        break;
      case 5:
        itemStatus = orderStatus.cancelled;
        break;
      default:
        break;
    }
    item.status = itemStatus;
    item.loadingPlace.id = index;
    item.loadingPlace.name += index;
    item.unloadingPlace.id = index;
    item.unloadingPlace.name += index;
    item.volume += getRandomCounterValue();
    item.carrier.email += index;
    item.carrier.role += index;
    item.carrier.lastName += index;
    item.carrier.firstName += index;
    item.carrier.companyName += index;
    if (role === 'carrier') {
      item.cargoType = `item name ${index}`
    } else {
      item.cargoType.id = index;
      item.cargoType.name += index;
    }
    item.loadingDate = new Date().toISOString();
    item.unloadingDate = new Date().toISOString();
    item.createdDatetime = new Date().toISOString();
    item.lastModifiedDatetime = new Date().toISOString();
    item.transportReservedDatetime = new Date().toISOString();
    item.contractAttachedDatetime = new Date().toISOString();
    item.readyToGoDatetime = new Date().toISOString();
    item.lot.id = `lot-${index}`;
    item.lot.order = orderObj();
    item.lot.startDatetime = new Date().toISOString();
    item.lot.endDatetime = new Date(new Date().getTime() + 100000000).toISOString();
    item.lot.startPrice = index;
    item.lot.minStepPrice = index;
    item.lot.lastBet = index;
    item.price += getRandomCounterValue();
    item.weight += getRandomCounterValue();
    item.comment += index;
    item.isLastBetMine = (index % 2 === 0) ? true : false;
    return item;
  });

  // console.log('getAuctionOrders', orders);

  const filterByStatusIn = (!status_In || !Array.isArray(status_In)) ? false : status_In.length ? true : false;
  const filterByStatus = status && typeof status === 'string' && status !== 'null';

  // console.log('filterByStatusIn', filterByStatusIn, 'filterByStatus', filterByStatus);

  if (filterByStatusIn || filterByStatus) {
    auctionOrders = auctionOrders.filter((item) => {
      let result = false;
      if (filterByStatusIn) {
        result = status_In.indexOf(item.status) !== -1;
        // console.log('item', item.status, '| status_In', status_In, '| result', result);
      } else if (filterByStatus) {
        result = (item.status === status) ? true : false;
        // console.log('item', item.status, '| status', status, '| result', result);
      }
      return result;
    });
  }

  // console.log('getAuctionOrders, orders filtered', auctionOrders);

  if (first > 0 && offset >= 0) {
    auctionOrders = auctionOrders.slice(offset, offset + first);
  }

  return auctionOrders;
}

/**
 * Gets auction order by id
 * @param {String} id order id
 * @param role supported values: carrier; results in different object model
 */
const getAuctionOrder = (id, role) => getAuctionOrders(role).find(item => {
  if (role === 'carrier') {
    item.cargoType = `item name ${id}`
  }
  return item.id == id;
});

/**
 * Returns lots list.
 */
const getLots = () => {

  // console.log('getLots');

  let lots = Array.apply(null, Array(50)).map((item, index) => {
    item = lotObject();
    item.id = `lot-${index}`;
    item.order = orderObj();
    item.startDatetime = new Date().toISOString();
    item.endDatetime = new Date(new Date().getTime() + 100000000).toISOString();
    item.startPrice += index;
    item.minStepPrice += index;
    item.lastBet += index;
    item.lastBetDatetime = new Date().toISOString();
    item.enableNotifications = true;
    item.auctionStatus = 'ACTIVE';
    return item;
  });

  // console.log('getLots', lots);

  return lots;
}

/**
 * Gets lot by id.
 * @param {String} id order id
 */
const getLot = (id) => getLots().find(item => {
  item.id == id;
  return item;
});

/**
 * Default carrier object.
 */
const carrierObj = () => new Object({
  id: 0,
  email: 'user@email',
  lastName: 'last name ',
  firstName: 'first name ',
  companyName: 'company name '
});

/**
 * Returns carriers list.
 */
const getCarriers = () => Array.apply(null, Array(5)).map((item, index) => {
  item = carrierObj();
  item.id = index;
  item.email += index;
  item.lastName += index;
  item.firstName += index;
  item.companyName += index;
  return item;
});

/**
 * Gets carrier by id
 * @param {String} id carrier id
 */
const getCarrier = (id) => getCarriers().find(item => item.id == id)

/**
 * Default place object.
 * @param loadingPlace Indicates if place is loading
 */
const placeObj = (loadingPlace) => new Object({
  id: 0,
  name: 'loading place',
  address: 'place full address',
  companyName: 'place company name',
  settlement: 'place settlement',
  workingHoursFrom: '10:00',
  workingHoursTo: '16:00',
  typePoint: 'LOADING',
  isArchived: false
});

/**
 * Returns loading/unloading places.
 * @param {Boolean} loadingPlace Indicates if place is loading
 */
const getPlaces = (loadingPlace) => Array.apply(null, Array(5)).map((item, index) => {
  item = placeObj(loadingPlace);
  item.id = index;
  item.name += index;
  return item;
});

/**
 * Returns loading/unloading places.
 * @param {Boolean} loadingPlace Indicates if place is loading
 */
const getAnyPlaces = (loadingPlace) => Array.apply(null, Array(5)).map((item, index) => {
  item = placeObj(loadingPlace);
  item.id = index;
  item.name += index;
  item.typePoint = Math.round(Math.random()) < 0.5 ? 'LOADING' : 'UNLOADING';
  return item;
});

/**
 * Return mock for cargo owner (CarrierOrganizationType)
 */
const cargoOwnerObj = () => new Object({
  id: 0,
  name: 'owner example'
})

/**
 * Return mock for vehicle owner
 */
const vehicleTypeObj = () => new Object({
  id: 0,
  name: 'фургон'
})

/**
 * Return mock for permitted loading
 */
const permittedLoadingTypeObj = () => new Object({
  id: 0,
  name: 'бок'
})

/**
 * Default cargo type object.
 */
const cargoTypeObj = () => new Object({
  id: 0,
  name: 'cargo t ',
  cargoOwner: cargoOwnerObj(),
  defaultVolume: 1.0,
  defaultWeight: 1.0,
  typeVehicle: vehicleTypeObj(),
  packagingType: 'BOXES',
  numberCargoPackages: 2,
  lengthCargoPackage: 2.0,
  widthCargoPackage: 3.1,
  heightCargoPackage: 2.6,
  permittedLoadingTypes: Array.apply(null, Array(4)).map((item, index) => {
    let loadObj = permittedLoadingTypeObj();
    loadObj.id = index;
    return loadObj;
  }),
  isArchived: false
});

/**
 * Returns cargo types.
 */
const getCargoTypes = (first, offset) => {
  let items = Array.apply(null, Array(15)).map((item, index) => {
    item = cargoTypeObj();
    item.id = index;
    item.name += index;
    return item;
  });
  if (first > 0 && offset >= 0) {
    items = items.slice(offset, offset + first);
  }
  return items;
}

/**
 * Return list of object with id and numbered name
 * @param {*} namePlaceHolder Text for naming
 */
const getListIdName = (namePlaceHolder) => {
  let items = Array.apply(null, Array(5)).map((item, index) => {
    item = {
      id: index,
      name: `${namePlaceHolder} #${index}`
    };
    return item;
  });
  return items;
}

/**
 * Return mock list of loading types
 */
const getLoadingTypes = () => {
  return getListIdName('loading type');
}

/**
 * Make mock object for carrier contract
 * @param {*} id - id
 * @param {*} cargoQuantity - Count of shipping
 * @param {*} contractNumber - Number of contract
 * @param {*} startDate - Contract start date
 * @param {*} endDate - Contract end date
 */
const carrierContractObj = (id, cargoQuantity, contractNumber, startDate, endDate) => {
  return {
    cargoQuantity: cargoQuantity,
    cargoTypes: [],
    contractNumber: contractNumber,
    endDate: endDate,
    id: id,
    isArchived: false,
    loadingPlaces: [],
    startDate: startDate,
    unloadingPlaces: []
  }
} 

const carrierContractTypeObj = () => {
  return {
    id: 1,
    name: 'carrier organization',
    about: 'about',
    phoneNumber: '79023545734',
    email: 'al@example.com',
    status: 'status',
    contracts: [
      carrierContractObj(1, 2, '1111', '2019-07-01', '2029-08-02'),
      carrierContractObj(2, 12, '222', '2020-08-01', '2021-07-12'),
    ]
  }
};

/**
 * Return mock list of carrier organizations 
 */
const getCarrierOrganizations = (withContracts) => {
  let items = Array.apply(null, Array(15)).map((item, index) => {
    item = carrierContractTypeObj();
    item.id = index + 1;
    item.name = `carrier organization #${index}`;
    item.about = `about #${index}`;
    item.status = `status #${index}`;
    return item;
  });
  return items;
}

/**
 * Return carrier organization by id
 * @param {id} id of carrier organization
 */
const getCarrierOrganization = (id) => getCarrierOrganizations().find(item => item.id == id);

/**
 * Make result contract object for rdit and create operation
 * @param {*} input Carrier contract data
 */
const editCarrierContractObj = (input) => {
  let res = {
    isArchived: false,
  };
  input.loadingPlaces = input.loadingPlaces && input.loadingPlaces.map(id => {
    return getLoadingPlace(id)
  });
  input.unloadingPlaces = input.unloadingPlaces && input.unloadingPlaces.map(id => {
    return getUnloadingPlace(id)
  });
  input.cargoTypes = input.cargoTypes && input.cargoTypes.map(id => {
    return getCargoType(id)
  });
  Object.assign(res, input);
  return res;
}

/**
 * Return mock list of vehicle types 
 */
const getVehicleTypes = () => {
  return getListIdName('vehicle type');
}

/**
 * Gets cargo type by id.
 * @param {String} id cargo type id
 */
const getCargoType = (id) => getCargoTypes().find(item => item.id == id);

/**
 * Remove cargo type.
 * @param {String} id cargo type id
 */
const archiveCargoTypeById = (id) => {
  const cargoType = getCargoType(id);
  return cargoType ? cargoType : new GraphQLError(`Validation: Cargo type with id ${id} does not exist.`);
};

/**
 * Gets unloading place by id
 * @param {String} id unloading place id
 */
const getUnloadingPlace = (id) => getPlaces().find(item => item.id == id);

/**
 * Gets loading place by id
 * @param {String} id unloading place id
 */
const getLoadingPlace = (id) => getPlaces(true).find(item => item.id == id);

/**
 * Cancels order.
 * @param {String} id order id
 * @param {String} role supported values: carrier; results in different object model
 */
const cancelOrderById = (id, role) => {
  const order = getOrder(id, role);
  return order ? order : new GraphQLError(`Validation: Order with id ${orderId} does not exist.`);
};

/**
 * Accepts order by id
 * @param {String} id order id
 * @param {String} role supported values: carrier; results in different object model
 */
const acceptOrderById = (id, role) => {
  const order = getOrders(role).filter(item => item.id == id);
  return order.length ? order[0] : new GraphQLError(`Validation: Order with id ${id} does not exist.`);
};

/**
 * Completes order by id
 * @param {String} id order id
 * @param {String} role supported values: carrier; results in different object model
 */
const completeOrderById = (id, role) => {
  const order = getOrders(role).filter(item => item.id == id);
  return order.length ? order[0] : new GraphQLError(`Validation: Order with id ${id} does not exist.`);
};

/**
 * GraphQL schema resolvers for express.
 */
exports.express = {
  owner: {
    // QUERIES
    balance: () => getBalance(), // TODO: update values
    catalogue: () => getCatalogue(), // TODO: update values
    profile: () => getProfile(),
    orders: ({status, status_In, first, offset}) => getOrders('', status, status_In, first, offset),
    order: ({id}) => getOrder(id),
    auctionOrders: ({status, status_In, first, offset}) => getAuctionOrders('', status, status_In, first, offset),
    auctionOrder: ({id}) => getAuctionOrder(id),
    myOrders: ({first, offset}) => getOrders('', null, null, first, offset),
    lots: () => getLots(),
    lot: ({id}) => getLot(id),
    carriers: () => getCarriers(),
    carrier: ({id}) => getCarrier(id),
    loadingPlaces: () => getAnyPlaces(true),
    loadingPlace: ({id}) => getLoadingPlace(id),
    unloadingPlaces: () => getPlaces(),
    unloadingPlace: ({id}) => getUnloadingPlace(id),
    cargoTypes: ({first, offset}) => getCargoTypes(first, offset),
    cargoType: ({id}) => getCargoType(id),
    loadingTypes: () => getLoadingTypes(),
    carrierOrganizations: ({withContracts}) => getCarrierOrganizations(withContracts),
    carrierOrganization: ({id}) => getCarrierOrganization(id),
    vehicleTypes: () => getVehicleTypes(),
    // MUTATIONS
    addLoadingUnloadingPlace: ({input}) => {
      input.id = 'newPlaceTypeId';
      return input;
    },
    editLoadingUnloadingPlace: ({input}) => {
      input.id = 'newPlaceTypeId';
      return input;
    },
    sendLoadingUnloadingPlaceToArchive: (placeId) => sendLoadingUnloadingPlaceToArchive(placeId),
    sendCargoTypeToArchive: ({cargoTypeId}) => archiveCargoTypeById(cargoTypeId),
    addCargoType: ({input}) => {
      let res = cargoTypeObj();
      res.id = 'newCargoTypeId'
      return res;
    },
    editCargoType: ({input}) => {
      let res = cargoTypeObj();
      return res;
    },
    addOrder: ({input}) => {
      input.id = 'newOrderId';
      return input;
    },
    editCarrierContract: ({input}) => {
      return editCarrierContractObj(input);
    },
    addCarrierContract: ({input}) => {
      let res = editCarrierContractObj(input);
      res.id = 'newId';
      return res;
    },
    sendCarrierContractToArchive: ({carrierContractId}) => { 
      return carrierContractObj(carrierContractId, 2, '1111', '2019-07-01', '2029-08-02');
    },
    cancelOrder: ({id}) => cancelOrderById(id),
    assignCarrier: ({carrierId, orderId}) => {
      const order = getOrders().filter(item => item.id == orderId);
      const carrier = getPlaces().filter(item => item.id == carrierId);
      const output = order.length && carrier.length ? order[0] : null;
      if (output) {
        output.carrier = carrier[0];
      }
      const error = (order.length) ? new GraphQLError(`Validation: Order with id ${orderId} does not exist.`) : (carrier.length) ? new GraphQLError(`Validation: Carrier with id ${carrierId} does not exist.`) : null;
      return output ? output : error;
    }
  },
  carrier: {
    // QUERIES
    balance: () => getBalance(), // TODO: update values
    catalogue: () => getCatalogue(), // TODO: update values
    profile: () => getProfile(),
    orders: ({status, status_In, first, offset}) => getOrders('carrier', status, status_In, first, offset),
    order: ({id}) => getOrder(id, 'carrier'),
    auctionOrders: ({status, status_In, first, offset}) => getAuctionOrders('carrier', status, status_In, first, offset),
    auctionOrder: ({id}) => getAuctionOrder(id, 'carrier'),
    myOrders: ({first, offset}) => getOrders('carrier', null, null, first, offset),
    lots: () => getLots(),
    lot: ({id}) => getLot(id),
    carriers: () => getCarriers(),
    carrier: ({id}) => getCarrier(id),
    loadingPlaces: () => getPlaces(true),
    loadingPlace: ({id}) => getLoadingPlace(id),
    unloadingPlaces: () => getPlaces(),
    unloadingPlace: ({id}) => getUnloadingPlace(id),
    // MUTATIONS
    acceptOrder: ({id}) => acceptOrderById(id, 'carrier'),
    cancelOrder: ({id}) => cancelOrderById(id, 'carrier'),
    completeOrder: ({id}) => completeOrderById(id, 'carrier')
  }
};
