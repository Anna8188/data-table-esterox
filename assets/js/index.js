import DataTable from './DataTable.js';

const columns = ['Id', 'Name', 'Age'];
const columns1 = [
	{
	 value: 'Id',
     sortId: 'id' 
	},
	{
	 value: 'Name',
	 sortId:'name'
	},
	{
	 value: 'Age',
     sortId: 'age'
	}]

const data = [
	{
		id: 1,
		name: 'Albert',
		age: 50,
	},
	{
		id: 2,
		name: 'Gevorg',
		age: 51,
	},
	{
		id: 3,
		name: 'Hakob',
		age: 31,
	},
	{
		id: 4,
		name: 'Tom',
		age: 28,
	},
	{
		id: 5,
		name: 'Astxik',
		age: 35,
	},
	{
		id: 6,
		name: 'Hayk',
		age: 25,
	},
	{
		id: 7,
		name: 'Tom',
		age: 33,
	},
	{
		id: 8,
		name: 'Arman',
		age: 18,
	},
	{
		id: 9,
		name: 'Mane',
		age: 67,
	},
	{
		id: 10,
		name: 'Marat',
		age: 43,
	},
	{
		id: 11,
		name: 'Tom',
		age: 63,
	},
	{
		id: 12,
		name: 'Tom',
		age: 48,
	},
	{
		id: 13,
		name: 'Sona',
		age: 29,
	},
	{
		id: 14,
		name: 'Tatev',
		age: 20,
	},
	{
		id: 15,
		name: 'Armen',
		age: 60,
	},
	{
		id: 16,
		name: 'Tigran',
		age: 19,
	},
	{
		id: 17,
		name: 'Sargis',
		age: 27,
	},
	{
		id: 18,
		name: 'Armine',
		age: 30,
	},
	{
		id: 19,
		name: 'Arpine',
		age: 26,
	},
	{
		id: 20,
		name: 'Marine',
		age: 52,
	},
	{
		id: 21,
		name: 'Siran',
		age: 35,
	},
	{
		id: 22,
		name: 'Samvel',
		age: 46,
	},
	{
		id: 23,
		name: 'Valodia',
		age: 68,
	},
	{
		id: 24,
		name: 'Karen',
		age: 40,
	},
];
const options =  {
	perPage: 2,
	rowClassName :'',
	cellClassName: '',
	tableClassName: 'data-table',
}
const dataTable = new DataTable(columns1, data,options);
const $dataTableContainer = document.querySelector('.data-table-container');
dataTable.createTable($dataTableContainer);

// Element.prototype.dataTable = function() {

// };

// const $table = document.querySelector('.data-table-container');
