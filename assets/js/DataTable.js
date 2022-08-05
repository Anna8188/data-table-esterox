class DataTable {
	constructor(columns = [], data = [], {
		perPage= 2,
     	rowClassName ='',
	    cellClassName= '',
	    tableClassName= 'data-table',
	}) {
		this.originalData = [...data];
		this.columns = columns;
		this.data = data;
		this.count = perPage;
		this.tableClassName = tableClassName;
		this.countOfPages = Math.ceil(data.length / this.count);
		this.pages = [];
		this.pageNumber = 1;
	}
	createTable( $dataTableContainer) {
		this.dataTableContainer =  $dataTableContainer;
		const $table = document.createElement('table');
		this.table = $table;
		this.dataTableContainer.appendChild($table);
		this.dataTableContainer.classList.add(this.tableClassName);
        this.createInput()
		this.createThead();
		this.createTbody();
		this.renderData();
		this.createPagination();
		this.sort();
	}
	createInput(){
		const $chooseCount = document.createElement('div');
		const $input = document.createElement('input');
		const $button = document.createElement('button');
		$chooseCount.appendChild($input);
		$chooseCount.appendChild($button);
		$button.innerHTML = 'Enter';
	    this.dataTableContainer.appendChild($chooseCount);
		$button.onclick = () => {
           this.count = + $input.value;
		   this.countOfPages = Math.ceil(this.data.length / this.count);
		   this.createPagination();
		   this.goOnThePage();
		}
	}
	createThead() {
		const $thead = document.createElement('thead');
		const $tr = document.createElement('tr');
		this.columns.forEach((column) => {
			const $th = document.createElement('th');
			$th.innerHTML = column;
			$tr.appendChild($th);
		});
		$thead.appendChild($tr);
		this.table.appendChild($thead);
	}

	createTbody() {
		this.$tbody = document.createElement('tbody');
		this.table.appendChild(this.$tbody);
	}

	renderData(
		data = this.data.slice(this.pageNumber * this.count - this.count, this.pageNumber * this.count)
	) {		
		this.$trs = data.map((item) => {
			const $tr = document.createElement('tr');
			for (const key in item) {
				const $td = document.createElement('td');
				$td.innerHTML = item[key];
				$tr.appendChild($td);
			}
			return $tr;
		});
		this.$trs.forEach(($tr) => {
			this.$tbody.appendChild($tr);
		});
	}
	createPagination() {
		if(document.querySelector(".pagination") !== null){
			const $pagination = document.querySelector(".pagination");
			this.dataTableContainer.removeChild($pagination);}
		const $pagination = document.createElement('div'); 
		$pagination.classList.add("pagination");
		this.dataTableContainer.appendChild($pagination);
		for (let i = 1; i < this.countOfPages + 1; i++ ) {
			let $page = document.createElement('a');
			$page.innerHTML = i;
			$pagination.appendChild($page);
			$page.addEventListener('click',  () => {
				this.pageNumber = i;
				this.goOnThePage();
			});
		}
	}
	goOnThePage() {	
		this.$trs.forEach(($tr) => {
			this.$tbody.removeChild($tr);
		}); 
		this.renderData();
		this.pageNumber = 1;
	}
	sort(){
let $checkbox = document.createElement('input');
$checkbox.type = "checkbox";
$checkbox.name = "name";
$checkbox.value = "value";
$checkbox.id = "checkbox1";
let $label = document.createElement('label');
$label.htmlFor = "checkbox1";
$label.appendChild(document.createTextNode('Sort by age'));
this.dataTableContainer.appendChild($checkbox);
this.dataTableContainer.appendChild($label);
$checkbox.addEventListener('click', ()=>{
if($checkbox.checked){
	this.data = this.data.sort((a, b) => parseFloat(a.age) - parseFloat(b.age));
	this.goOnThePage();
}
//else if(!$checkbox.checked){this.data = this.originalData;
// this.goOnThePage()};	
})
	}

}
export default DataTable;
