/*
 * json-validator
 * https://github.com/timmoses/json-validator
 *
 * Copyright (c) 2015 Tim Moses
 * Licensed under the GNU license.
 */

'use strict';


var c = exports;

exports.type = function(arg) {
	if (arg === null) { return('null'); }
	else if (Number.isNaN(arg)) { return('nan'); }
	else if (typeof arg === 'function') { return('function'); }
	else if (typeof arg === 'symbol') { return('symbol'); }
	else if (arg instanceof RegExp) { return('regexp'); }
	else if (Array.isArray(arg)) { return('array'); }
	else if (typeof arg === 'object') { return('object'); }
	else if (typeof arg === 'boolean') { return('boolean'); }
	else if (typeof arg === 'number') { return('number'); }
	else if (typeof arg === 'string') { return('string'); }
	else if (typeof(arg) === 'undefined') { return('undefined'); }
	return false;
};

exports.isBoolean = function(arg) { if (c.type(arg) === 'boolean') { return true; } else { return false; } };
exports.isNumber = function(arg) { if (c.type(arg) === 'number') { return true; } else { return false; } };
exports.isString = function(arg) { if (c.type(arg) === 'string') { return true; } else { return false; } };
exports.isRegexp = function(arg) { if (c.type(arg) === 'regexp') { return true; } else { return false; } };
exports.isFunction = function(arg) { if (c.type(arg) === 'function') { return true; } else { return false; } };
exports.isArray = function(arg) { if (c.type(arg) === 'array') { return true; } else { return false; } };
exports.isObject = function(arg) { if (c.type(arg) === 'object') { return true; } else { return false; } };
exports.isArrayWithContent = function(arg) { if (c.isArray(arg) && arg.length) { return true; } else { return false; } };
exports.isObjectWithContent = function(arg) { if (c.isObject(arg) && Object.keys(arg).length) { return true; } else { return false; } };
exports.isDate = function(arg) { if (arg.getTime() === arg.getTime()) { return true; } else { return false; } };

// isNothing returns true if input is null, undefined, or NaN
exports.isNothing = function(arg) {
	if ((c.type(arg) === 'null') || (c.type(arg) === 'undefined') || (c.type(arg) === 'nan')) { return true; }
	return false;
};
// isSomething returns true if input is not null, undefined, or NaN
exports.isSomething = function(arg) {
	if (c.isNothing(arg)) { return false; }
	return true;
};
// isEmpty returns true if input is null, undefined, NaN, false, 0, or ''
exports.isEmpty = function(arg) {
	if (c.isNothing(arg)) { return true; }
	if ((c.isBoolean(arg) || c.isNumber(arg) || c.isString(arg)) && !arg) { return true; }
	if (c.isArray(arg) && !c.isArrayWithContent(arg)) { return true; }
	if (c.isObject(arg) && !c.isObjectWithContent(arg)) { return true; }
	return false;
};

exports.isPositiveNumber = function(arg) { if ((c.type(arg) === 'number') && (arg >= 0)) { return true; } else { return false; } };
exports.isNegativeNumber = function(arg) { if ((c.type(arg) === 'number') && (arg <= 0)) { return true; } else { return false; } };
exports.isInteger = function(arg) {
	if (c.type(arg) !== 'number') { return false; }
	if (arg.toString().match(/^\-?[0-9]+$/)) { return true; }
	return false;
};
exports.isPositiveInteger = function(arg) { if (c.isInteger(arg) && (arg >= 0)) { return true; } else { return false; } };
exports.isNegativeInteger = function(arg) { if (c.isInteger(arg) && (arg <= 0)) { return true; } else { return false; } };

exports.isTopLevelDomain = function(arg) {
	if (!c.isString(arg)) { return false; }
	if (!arg.match(/^[a-z]{2,}$/i)) { return false; }
	// Return true here for basic check
	// Leave commented to match against list that may be out of date
//	return true;
	
	// http://data.iana.org/TLD/tlds-alpha-by-domain.txt
	// Version 2015100800
	var tldList = ['COM', 'ORG', 'EDU', 'NET',
'AAA', 'ABB', 'ABBOTT', 'ABOGADO', 'AC', 'ACADEMY', 'ACCENTURE', 'ACCOUNTANT', 'ACCOUNTANTS', 'ACO', 'ACTIVE', 'ACTOR',
'AD', 'ADS', 'ADULT', 'AE', 'AEG', 'AERO', 'AF', 'AFL', 'AG', 'AGENCY', 'AI', 'AIG',
'AIRFORCE', 'AIRTEL', 'AL', 'ALLFINANZ', 'ALSACE', 'AM', 'AMICA', 'AMSTERDAM', 'ANDROID', 'AO', 'APARTMENTS', 'APP',
'AQ', 'AQUARELLE', 'AR', 'ARCHI', 'ARMY', 'ARPA', 'AS', 'ASIA', 'ASSOCIATES', 'AT', 'ATTORNEY', 'AU',
'AUCTION', 'AUDIO', 'AUTO', 'AUTOS', 'AW', 'AX', 'AXA', 'AZ', 'AZURE', 'BA', 'BAND', 'BANK',
'BAR', 'BARCELONA', 'BARCLAYCARD', 'BARCLAYS', 'BARGAINS', 'BAUHAUS', 'BAYERN', 'BB', 'BBC', 'BBVA', 'BCN', 'BD',
'BE', 'BEER', 'BENTLEY', 'BERLIN', 'BEST', 'BET', 'BF', 'BG', 'BH', 'BHARTI', 'BI', 'BIBLE',
'BID', 'BIKE', 'BING', 'BINGO', 'BIO', 'BIZ', 'BJ', 'BLACK', 'BLACKFRIDAY', 'BLOOMBERG', 'BLUE', 'BM',
'BMS', 'BMW', 'BN', 'BNL', 'BNPPARIBAS', 'BO', 'BOATS', 'BOM', 'BOND', 'BOO', 'BOOTS', 'BOUTIQUE',
'BR', 'BRADESCO', 'BRIDGESTONE', 'BROKER', 'BROTHER', 'BRUSSELS', 'BS', 'BT', 'BUDAPEST', 'BUILD', 'BUILDERS', 'BUSINESS',
'BUZZ', 'BV', 'BW', 'BY', 'BZ', 'BZH', 'CA', 'CAB', 'CAFE', 'CAL', 'CAMERA', 'CAMP',
'CANCERRESEARCH', 'CANON', 'CAPETOWN', 'CAPITAL', 'CAR', 'CARAVAN', 'CARDS', 'CARE', 'CAREER', 'CAREERS', 'CARS', 'CARTIER',
'CASA', 'CASH', 'CASINO', 'CAT', 'CATERING', 'CBA', 'CBN', 'CC', 'CD', 'CEB', 'CENTER', 'CEO',
'CERN', 'CF', 'CFA', 'CFD', 'CG', 'CH', 'CHANEL', 'CHANNEL', 'CHAT', 'CHEAP', 'CHLOE', 'CHRISTMAS',
'CHROME', 'CHURCH', 'CI', 'CISCO', 'CITIC', 'CITY', 'CK', 'CL', 'CLAIMS', 'CLEANING', 'CLICK', 'CLINIC',
'CLOTHING', 'CLOUD', 'CLUB', 'CLUBMED', 'CM', 'CN', 'CO', 'COACH', 'CODES', 'COFFEE', 'COLLEGE', 'COLOGNE',
'COMMBANK', 'COMMUNITY', 'COMPANY', 'COMPUTER', 'CONDOS', 'CONSTRUCTION', 'CONSULTING', 'CONTRACTORS', 'COOKING', 'COOL', 'COOP', 'CORSICA',
'COUNTRY', 'COUPONS', 'COURSES', 'CR', 'CREDIT', 'CREDITCARD', 'CRICKET', 'CROWN', 'CRS', 'CRUISES', 'CSC', 'CU',
'CUISINELLA', 'CV', 'CW', 'CX', 'CY', 'CYMRU', 'CYOU', 'CZ', 'DABUR', 'DAD', 'DANCE', 'DATE',
'DATING', 'DATSUN', 'DAY', 'DCLK', 'DE', 'DEALS', 'DEGREE', 'DELIVERY', 'DELTA', 'DEMOCRAT', 'DENTAL', 'DENTIST',
'DESI', 'DESIGN', 'DEV', 'DIAMONDS', 'DIET', 'DIGITAL', 'DIRECT', 'DIRECTORY', 'DISCOUNT', 'DJ', 'DK', 'DM',
'DNP', 'DO', 'DOCS', 'DOG', 'DOHA', 'DOMAINS', 'DOOSAN', 'DOWNLOAD', 'DRIVE', 'DURBAN', 'DVAG', 'DZ',
'EARTH', 'EAT', 'EC', 'EDUCATION', 'EE', 'EG', 'EMAIL', 'EMERCK', 'ENERGY', 'ENGINEER', 'ENGINEERING', 'ENTERPRISES',
'EPSON', 'EQUIPMENT', 'ER', 'ERNI', 'ES', 'ESQ', 'ESTATE', 'ET', 'EU', 'EUROVISION', 'EUS', 'EVENTS',
'EVERBANK', 'EXCHANGE', 'EXPERT', 'EXPOSED', 'EXPRESS', 'FAGE', 'FAIL', 'FAITH', 'FAMILY', 'FAN', 'FANS', 'FARM',
'FASHION', 'FEEDBACK', 'FI', 'FILM', 'FINAL', 'FINANCE', 'FINANCIAL', 'FIRMDALE', 'FISH', 'FISHING', 'FIT', 'FITNESS',
'FJ', 'FK', 'FLIGHTS', 'FLORIST', 'FLOWERS', 'FLSMIDTH', 'FLY', 'FM', 'FO', 'FOO', 'FOOTBALL', 'FOREX',
'FORSALE', 'FORUM', 'FOUNDATION', 'FR', 'FRL', 'FROGANS', 'FUND', 'FURNITURE', 'FUTBOL', 'FYI', 'GA', 'GAL',
'GALLERY', 'GAME', 'GARDEN', 'GB', 'GBIZ', 'GD', 'GDN', 'GE', 'GEA', 'GENT', 'GENTING', 'GF',
'GG', 'GGEE', 'GH', 'GI', 'GIFT', 'GIFTS', 'GIVES', 'GIVING', 'GL', 'GLASS', 'GLE', 'GLOBAL',
'GLOBO', 'GM', 'GMAIL', 'GMO', 'GMX', 'GN', 'GOLD', 'GOLDPOINT', 'GOLF', 'GOO', 'GOOG', 'GOOGLE',
'GOP', 'GOV', 'GP', 'GQ', 'GR', 'GRAPHICS', 'GRATIS', 'GREEN', 'GRIPE', 'GROUP', 'GS', 'GT',
'GU', 'GUGE', 'GUIDE', 'GUITARS', 'GURU', 'GW', 'GY', 'HAMBURG', 'HANGOUT', 'HAUS', 'HEALTHCARE', 'HELP',
'HERE', 'HERMES', 'HIPHOP', 'HITACHI', 'HIV', 'HK', 'HM', 'HN', 'HOCKEY', 'HOLDINGS', 'HOLIDAY', 'HOMEDEPOT',
'HOMES', 'HONDA', 'HORSE', 'HOST', 'HOSTING', 'HOTELES', 'HOTMAIL', 'HOUSE', 'HOW', 'HR', 'HSBC', 'HT',
'HU', 'HYUNDAI', 'IBM', 'ICBC', 'ICE', 'ICU', 'ID', 'IE', 'IFM', 'IINET', 'IL', 'IM',
'IMMO', 'IMMOBILIEN', 'IN', 'INDUSTRIES', 'INFINITI', 'INFO', 'ING', 'INK', 'INSTITUTE', 'INSURE', 'INT', 'INTERNATIONAL',
'INVESTMENTS', 'IO', 'IPIRANGA', 'IQ', 'IR', 'IRISH', 'IS', 'IST', 'ISTANBUL', 'IT', 'ITAU', 'IWC',
'JAVA', 'JCB', 'JE', 'JETZT', 'JEWELRY', 'JLC', 'JLL', 'JM', 'JO', 'JOBS', 'JOBURG', 'JP',
'JPRS', 'JUEGOS', 'KAUFEN', 'KDDI', 'KE', 'KG', 'KH', 'KI', 'KIA', 'KIM', 'KITCHEN', 'KIWI',
'KM', 'KN', 'KOELN', 'KOMATSU', 'KP', 'KR', 'KRD', 'KRED', 'KW', 'KY', 'KYOTO', 'KZ',
'LA', 'LACAIXA', 'LANCASTER', 'LAND', 'LASALLE', 'LAT', 'LATROBE', 'LAW', 'LAWYER', 'LB', 'LC', 'LDS',
'LEASE', 'LECLERC', 'LEGAL', 'LEXUS', 'LGBT', 'LI', 'LIAISON', 'LIDL', 'LIFE', 'LIGHTING', 'LIMITED', 'LIMO',
'LINDE', 'LINK', 'LIVE', 'LIXIL', 'LK', 'LOAN', 'LOANS', 'LOL', 'LONDON', 'LOTTE', 'LOTTO', 'LOVE',
'LR', 'LS', 'LT', 'LTD', 'LTDA', 'LU', 'LUPIN', 'LUXE', 'LUXURY', 'LV', 'LY', 'MA',
'MADRID', 'MAIF', 'MAISON', 'MAN', 'MANAGEMENT', 'MANGO', 'MARKET', 'MARKETING', 'MARKETS', 'MARRIOTT', 'MBA', 'MC',
'MD', 'ME', 'MEDIA', 'MEET', 'MELBOURNE', 'MEME', 'MEMORIAL', 'MEN', 'MENU', 'MG', 'MH', 'MIAMI',
'MICROSOFT', 'MIL', 'MINI', 'MK', 'ML', 'MM', 'MMA', 'MN', 'MO', 'MOBI', 'MODA', 'MOE',
'MOI', 'MOM', 'MONASH', 'MONEY', 'MONTBLANC', 'MORMON', 'MORTGAGE', 'MOSCOW', 'MOTORCYCLES', 'MOV', 'MOVIE', 'MOVISTAR',
'MP', 'MQ', 'MR', 'MS', 'MT', 'MTN', 'MTPC', 'MTR', 'MU', 'MUSEUM', 'MV', 'MW',
'MX', 'MY', 'MZ', 'NA', 'NADEX', 'NAGOYA', 'NAME', 'NAVY', 'NC', 'NE', 'NEC', 'NETBANK',
'NETWORK', 'NEUSTAR', 'NEW', 'NEWS', 'NEXUS', 'NF', 'NG', 'NGO', 'NHK', 'NI', 'NICO', 'NINJA',
'NISSAN', 'NL', 'NO', 'NOKIA', 'NP', 'NR', 'NRA', 'NRW', 'NTT', 'NU', 'NYC', 'NZ',
'OBI', 'OFFICE', 'OKINAWA', 'OM', 'OMEGA', 'ONE', 'ONG', 'ONL', 'ONLINE', 'OOO', 'ORACLE', 'ORANGE',
'ORGANIC', 'OSAKA', 'OTSUKA', 'OVH', 'PA', 'PAGE', 'PANERAI', 'PARIS', 'PARTNERS', 'PARTS', 'PARTY', 'PE',
'PET', 'PF', 'PG', 'PH', 'PHARMACY', 'PHILIPS', 'PHOTO', 'PHOTOGRAPHY', 'PHOTOS', 'PHYSIO', 'PIAGET', 'PICS',
'PICTET', 'PICTURES', 'PINK', 'PIZZA', 'PK', 'PL', 'PLACE', 'PLAY', 'PLUMBING', 'PLUS', 'PM', 'PN',
'POHL', 'POKER', 'PORN', 'POST', 'PR', 'PRAXI', 'PRESS', 'PRO', 'PROD', 'PRODUCTIONS', 'PROF', 'PROPERTIES',
'PROPERTY', 'PROTECTION', 'PS', 'PT', 'PUB', 'PW', 'PY', 'QA', 'QPON', 'QUEBEC', 'RACING', 'RE',
'REALTOR', 'REALTY', 'RECIPES', 'RED', 'REDSTONE', 'REHAB', 'REISE', 'REISEN', 'REIT', 'REN', 'RENT', 'RENTALS',
'REPAIR', 'REPORT', 'REPUBLICAN', 'REST', 'RESTAURANT', 'REVIEW', 'REVIEWS', 'RICH', 'RICOH', 'RIO', 'RIP', 'RO',
'ROCKS', 'RODEO', 'RS', 'RSVP', 'RU', 'RUHR', 'RUN', 'RW', 'RYUKYU', 'SA', 'SAARLAND', 'SAKURA',
'SALE', 'SAMSUNG', 'SANDVIK', 'SANDVIKCOROMANT', 'SANOFI', 'SAP', 'SARL', 'SAXO', 'SB', 'SC', 'SCA', 'SCB',
'SCHMIDT', 'SCHOLARSHIPS', 'SCHOOL', 'SCHULE', 'SCHWARZ', 'SCIENCE', 'SCOR', 'SCOT', 'SD', 'SE', 'SEAT', 'SECURITY',
'SEEK', 'SENER', 'SERVICES', 'SEVEN', 'SEW', 'SEX', 'SEXY', 'SG', 'SH', 'SHIKSHA', 'SHOES', 'SHOW',
'SHRIRAM', 'SI', 'SINGLES', 'SITE', 'SJ', 'SK', 'SKI', 'SKY', 'SKYPE', 'SL', 'SM', 'SN',
'SNCF', 'SO', 'SOCCER', 'SOCIAL', 'SOFTWARE', 'SOHU', 'SOLAR', 'SOLUTIONS', 'SONY', 'SOY', 'SPACE', 'SPIEGEL',
'SPREADBETTING', 'SR', 'SRL', 'ST', 'STADA', 'STARHUB', 'STATOIL', 'STC', 'STCGROUP', 'STOCKHOLM', 'STUDIO', 'STUDY',
'STYLE', 'SU', 'SUCKS', 'SUPPLIES', 'SUPPLY', 'SUPPORT', 'SURF', 'SURGERY', 'SUZUKI', 'SV', 'SWATCH', 'SWISS',
'SX', 'SY', 'SYDNEY', 'SYSTEMS', 'SZ', 'TAIPEI', 'TATAMOTORS', 'TATAR', 'TATTOO', 'TAX', 'TAXI', 'TC',
'TD', 'TEAM', 'TECH', 'TECHNOLOGY', 'TEL', 'TELEFONICA', 'TEMASEK', 'TENNIS', 'TF', 'TG', 'TH', 'THD',
'THEATER', 'THEATRE', 'TICKETS', 'TIENDA', 'TIPS', 'TIRES', 'TIROL', 'TJ', 'TK', 'TL', 'TM', 'TN',
'TO', 'TODAY', 'TOKYO', 'TOOLS', 'TOP', 'TORAY', 'TOSHIBA', 'TOURS', 'TOWN', 'TOYOTA', 'TOYS', 'TR',
'TRADE', 'TRADING', 'TRAINING', 'TRAVEL', 'TRUST', 'TT', 'TUI', 'TV', 'TW', 'TZ', 'UA', 'UBS',
'UG', 'UK', 'UNIVERSITY', 'UNO', 'UOL', 'US', 'UY', 'UZ', 'VA', 'VACATIONS', 'VC', 'VE',
'VEGAS', 'VENTURES', 'VERSICHERUNG', 'VET', 'VG', 'VI', 'VIAJES', 'VIDEO', 'VILLAS', 'VIN', 'VIRGIN', 'VISION',
'VISTA', 'VISTAPRINT', 'VIVA', 'VLAANDEREN', 'VN', 'VODKA', 'VOTE', 'VOTING', 'VOTO', 'VOYAGE', 'VU', 'WALES',
'WALTER', 'WANG', 'WATCH', 'WEBCAM', 'WEBSITE', 'WED', 'WEDDING', 'WEIR', 'WF', 'WHOSWHO', 'WIEN', 'WIKI',
'WILLIAMHILL', 'WIN', 'WINDOWS', 'WINE', 'WME', 'WORK', 'WORKS', 'WORLD', 'WS', 'WTC', 'WTF', 'XBOX',
'XEROX', 'XIN', 'XPERIA', 'XXX', 'XYZ', 'YACHTS', 'YAMAXUN', 'YANDEX', 'YE', 'YODOBASHI', 'YOGA', 'YOKOHAMA',
'YOUTUBE', 'YT', 'ZA', 'ZIP', 'ZM', 'ZONE', 'ZUERICH', 'ZW'];
	for (var i = 0; i < tldList.length; i++) {
		if (arg.toLowerCase() === tldList[i].toLowerCase()) { return true; }
	}
	return false;
};
exports.isDomain = function(arg) {
	if (!c.isString(arg)) { return false; }
//	if (arg.match(/((^|\.)-|-(\.|$))/) { return; }
	var domainParts = arg.match(/^([a-z0-9-]{1,63}\.)([a-z]{2,})$/i);
	if (c.isArray(domainParts) && domainParts[1]) { return c.isTopLevelDomain(domainParts[2]); }
	return false;
};
exports.isHostname = function(arg) {
	if (!c.isString(arg)) { return false; }
//	if (arg.match(/((^|\.)\-|\-(\.|$))/) { return; }
	var hostnameParts = arg.match(/^([a-z0-9-]{1,63}\.)+([a-z]{2,})\.?$/i);
	if (c.isArray(hostnameParts) && hostnameParts[1]) { return c.isTopLevelDomain(hostnameParts[2]); }
	return false;
};
exports.isEmail = function(arg) {
	if (!c.isString(arg)) { return false; }
	// var emailParts = arg.match(/^([a-z0-9][a-z0-9\!\$\^\*\(\)_\-\+~`\\\[\]\{\}",\.]*)@(.+)$/i);
	// From http://www.regular-expressions.info/email.html
	var emailParts = arg.match(/^([a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*)@(.+)$/i);
	if (c.isArray(emailParts) && emailParts[1]) { return c.isHostname(emailParts[2]); }
	return false;
};
exports.parseHttpURL = function(arg) {
	if (!c.isString(arg)) { return; }
	var urlParts = arg.match(/^(https?):\/\/([a-z0-9.-]+)(?::(\d+))?(\/.*?)?(?:\?(.+)?)?$/);
	if (!c.isArrayWithContent(urlParts)) { return; }
	if (!c.isHostname(urlParts[2])) { return; }
	var url = {
		protocol:		urlParts[1],
		hostname:		urlParts[2],
		port:			urlParts[3],
		path:			urlParts[4],
		queryString:	urlParts[5]
	};
	c.stripObject(url, true);
	return url;
};
exports.isHttpURL = function(arg) {
	var url = c.parseHttpURL(arg);
	if (c.isObjectWithContent(url)) { return true; }
	return false;
};
exports.parseARN = function(arg) {
	if (!c.isString(arg)) { return; }
//	arn:partition:service:region:account-id:resource
//	arn:partition:service:region:account-id:resourcetype/resource
//	arn:partition:service:region:account-id:resourcetype:resource
	var arnParts = arg.match(/^arn:([a-z0-9-]+):([a-z0-9-]+):([a-z0-9-]*):(\d*):(.+)$/);
	if (!c.isArrayWithContent(arnParts)) { return; }
	var arn = {
		partition:	arnParts[1],
		service:	arnParts[2],
		region:		arnParts[3],
		accountId:	arnParts[4],
		resource:	arnParts[5]
	};
	c.stripObject(arn, true);
	return arn;
};
exports.isARN = function(arg) {
	var arn = c.parseARN(arg);
	if (c.isObjectWithContent(arn)) { return true; }
	return false;
};
exports.isSesARN = function(arg) {
	var arn = c.parseARN(arg);
	if (!c.isObjectWithContent(arn)) { return false; }
//	arn:aws:ses:us-west-2:986331161080:identity/support@sitemason.com
//	arn:aws:ses:us-east-1:123456789012:identity/example.com
	if (!arn.partition.match(/^aws/)) { return false; }
	if (arn.service !== 'ses') { return false; }
	var identity = arn.resource.match(/^identity\/(.+)$/);
	if (!c.isArrayWithContent(identity)) { return false; }
	if (c.isHostname(identity[1])) { return true; }
	else if (c.isEmail(identity[1])) { return true; }
	return false;
};


/*
stripObject and stripArray recursively remove key/value pairs or array elements with values that are
		null and undefined, empty objects, or empty arrays. Returns true if anything was removed. False, otherwise.
	c.stripObject(_source);
	c.stripArray(_source);
*/
exports.stripObject = function(_source, _isEmpty) {
	var key;
	var result = false;
	if (c.isObject(_source)) {
		for (key in _source) {
			if (_isEmpty && c.isEmpty(_source[key])) { delete _source[key]; result = true; }
			else if (c.isNothing(_source[key])) { delete _source[key]; result = true; }
			else if (c.isObject(_source[key])) {
				if (c.isObjectWithContent(_source[key])) { if (c.stripObject(_source[key], _isEmpty)) { result = true; } }
				if (!c.isObjectWithContent(_source[key])) { delete _source[key]; result = true; }
			}
			else if (c.isArray(_source[key])) {
				if (c.isArrayWithContent(_source[key])) { if(c.stripObject(_source[key], _isEmpty)) { result = true; } }
				if (!c.isArrayWithContent(_source[key])) { delete _source[key]; result = true; }
			}
		}
	}
	else if (c.isArray(_source)) {
		for (key = 0; key < _source.length; key++) {
			if (_isEmpty && c.isEmpty(_source[key])) { _source.splice(key, 1); result = true; key--; }
			else if (c.isNothing(_source[key])) { _source.splice(key, 1); result = true; key--; }
			else if (c.isObject(_source[key])) {
				if (c.isObjectWithContent(_source[key])) { if (c.stripObject(_source[key], _isEmpty)) { result = true; } }
				if (!c.isObjectWithContent(_source[key])) { _source.splice(key, 1); result = true; key--; }
			}
			else if (c.isArray(_source[key])) {
				if (c.isArrayWithContent(_source[key])) { if (c.stripObject(_source[key], _isEmpty)) { result = true; } }
				if (!c.isArrayWithContent(_source[key])) { _source.splice(key, 1); result = true; key--; }
			}
		}
	}
	return result;
};
exports.stripArray = exports.stripObject;

/*
checkInput tests input object and returns converted object and errors
	var results = c.checkInput(_data, _fields, _options);
		_data - input object to test
		_fields - array of objects containing field definitions
			[ {
				name		required, a string matching each key from the input object that should be included in the output
				type		optional, one of 'boolean', 'number', 'string', 'array', 'object' used to convert or produce error
				require		optional, boolean true or 'exists', 'value', 'same as {field}', 'different than {field}', 'with {field}', 'without {field}'
				format		optional, one of 'domain', 'email', 'hostname' for strings or 'integer' for numbers to require that format
				regexp		optional, string values must match this regular expression
				values		optional, array of whitelisted values
				actions		optional, array of actions to perform on strings: 'lowercase', 'uppercase', 'strip'
			}, ... ]
		_options - optional parameters for the function
			{
				prefix		string to be prefixed to error messages
			}

		results
			{
				data		converted version of original input object (_data)
				messages	array of error messages
				isModified	true if any fields were modified
			}
	
	Require: exists || value || same || different || with || without   ##### ADD TESTS
	Number: values || min, max || format
	Add default
	isIPv4, isIPv6
	Support Error
	
	Array: min,max || length
	Array actions: split
	Add recursive validation
	Extendable
*/
exports.checkInput = function(_data, _fields, _options) {
	if (!c.isObject(_data)) { _data = {}; }
	if (!c.isArrayWithContent(_fields)) { return; }
	if (!c.isObject(_options)) { _options = {}; }
	var prefix = '';
	if (_options.prefix) { prefix = _options.prefix + ' '; }
	
	var output = { data: {}, messages: [], isModified: false };
	var i;
	for (i = 0; i < _fields.length; i++) {
		var field = _fields[i];
		if (!field.name) { continue; }
		
		// Require: exists
		if (c.isNothing(_data[field.name])) {
			if (field.require && (c.isBoolean(field.require) || (field.require === 'exists'))) {
				output.messages.push(prefix + '\'' + field.name + '\' is required');
				output.error[field.name] = 'require';
			}
			continue;
		}
		var data = _data[field.name];
		
		// Convert types
		if ((field.type === 'array') && (c.isString(data) || c.isNumber(data) || c.isBoolean(data))) {
			data = [_data[field.name]];
			output.isModified = true;
		} else if (field.type === 'string') {
			if (c.isNumber(data)) { data = data.toString(); output.isModified = true; }
			else if (c.isBoolean(data) && data) { data = ''; output.isModified = true; }
		} else if (field.type === 'number') {
			if (c.isString(data)) { data = data.parseFloat(); output.isModified = true; }
			else if (c.isBoolean(data)) {
				if (data) { data = 1; } else { data = 0; }
				output.isModified = true;
			}
		} else if ((field.type === 'boolean') && !c.isBoolean(data)) {
			if (c.isEmpty(data)) { data = false; }
			else { data = true; }
			output.isModified = true;
		}
		
		// Actions
		if (c.isArrayWithContent(field.actions)) {
			if (field.type === 'string') {
				for (var a = 0; a < field.actions.length; a++) {
					if (field.actions[a] === 'lowercase') { data = data.toLowerCase(); }
					else if (field.actions[a] === 'uppercase') { data = data.toUpperCase(); }
					else if (field.actions[a] === 'strip') { data = data.replace(/(?:^\s+|\s+$)/g, ''); }
				}
			}
		}
		
		// Require: value
		if ((field.require === 'value') && c.isEmpty(data)) {
			output.messages.push(prefix + '\'' + field.name + '\' should have a value');
			output.error[field.name] = 'require';
			continue;
		}
		
		// Check types
		var hasError;
		if ((field.type === 'boolean') && !c.isBoolean(data)) { hasError = true; }
		if ((field.type === 'number') && !c.isNumber(data)) { hasError = true; }
		if ((field.type === 'string') && !c.isString(data)) { hasError = true; }
		if ((field.type === 'array') && !c.isArray(data)) { hasError = true; }
		if ((field.type === 'object') && !c.isObject(data)) { hasError = true; }
		if (hasError) {
			output.messages.push(prefix + '\'' + field.name + '\' is not a ' + field.type);
			output.error[field.name] = 'type';
			continue;
		}
		
		// Check values whitelist
		var j;
		var fail;		
		if (c.isArray(field.values)) {
			var found;
			for (j = 0; j < field.values.length; j++) {
				if (field.values[j] === data) { found = true; continue; }
			}
			if (!found) {
				output.messages.push(prefix + '\'' + field.name + '\' is not an accepted value');
				output.error[field.name] = 'values';
				continue;
			}
		}
		else if ((field.type === 'number') && field.format) {
			if ((field.format === 'integer') && !c.isPositiveInteger(data)) { fail = true; }
			if (fail) {
				output.messages.push(prefix + '\'' + field.name + '\' is the wrong format');
				output.error[field.name] = 'format';
				continue;
			}
		}
		else if (field.type === 'string') {
			if (field.format) {
				if ((field.format === 'domain') && !c.isDomain(data)) { fail = true; }
				if ((field.format === 'hostname') && !c.isHostname(data)) { fail = true; }
				if ((field.format === 'email') && !c.isEmail(data)) { fail = true; }
				if ((field.format === 'httpURL') && !c.isHttpURL(data)) { fail = true; }
				if ((field.format === 'integer') && !c.isPositiveInteger(data)) { fail = true; }
				if ((field.format === 'arn') && !c.isARN(data)) { fail = true; }
				if ((field.format === 'sesARN') && !c.isSesARN(data)) { fail = true; }
				if (fail) { output.messages.push(prefix + '\'' + field.name + '\' is the wrong format'); }
			}
			
			if (field.regexp && c.isRegexp(field.regexp)) {
				if (!data.match(field.regexp)) { fail = true; }
				if (fail) {
					output.messages.push(prefix + '\'' + field.name + '\' does not match the regex pattern');
					output.error[field.name] = 'regexp';
				}
			}
		}
		output.data[field.name] = data;
	}
	
	// Post processing
	for (i = 0; i < _fields.length; i++) {
		// Require: exists || value || same || different || with || without
		if (_fields[i].require) {
			var parts = _fields[i].require.match(/^(same(?: as)?|different(?: as| than)?|with|without) +(.*?)$/);
			if (!parts[1] || !parts[2]) { continue; }
			var command = parts[1];
			var sourceName = _fields[i].name;
			var targetName = parts[2];
			var source = output[_fields[i].name];
			var target = output[parts[2]];
			
			if (command.match(/^same/)) {
				if ((c.type(source) !== c.type(target)) || (source !== target)) {
					output.messages.push(prefix + '\'' + sourceName + '\' is not the same as \'' + targetName + '\'');
					output.error[sourceName] = 'require';
				}
			}
			else if (command.match(/^different/)) {
				if ((c.type(source) === c.type(target)) && (source === target)) {
					output.messages.push(prefix + '\'' + sourceName + '\' is not different than \'' + targetName + '\'');
					output.error[sourceName] = 'require';
				}
			}
			else if (command === 'with') {
				if (c.isSomething(source) && !c.isSomething(target)) {
					output.messages.push(prefix + '\'' + sourceName + '\' exists but \'' + targetName + '\' does not');
					output.error[sourceName] = 'require';
				}
				if (!c.isSomething(source) && c.isSomething(target)) {
					output.messages.push(prefix + '\'' + sourceName + '\' does not exist but \'' + targetName + '\' does');
					output.error[sourceName] = 'require';
				}
			}
			else if (command === 'without') {
				if (c.isSomething(source) && c.isSomething(target)) {
					output.messages.push(prefix + '\'' + sourceName + '\' and \'' + targetName + '\' exist');
					output.error[sourceName] = 'require';
				}
				if (!c.isSomething(source) && !c.isSomething(target)) {
					output.messages.push(prefix + '\'' + sourceName + '\' and \'' + targetName + '\' do not exist');
					output.error[sourceName] = 'require';
				}
			}
		}
	}
	
	
	return output;
};

	
