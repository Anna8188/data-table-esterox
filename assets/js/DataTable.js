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
		this.countOfPages = Math.ceil(this.data.length / this.count);
		this.pages = [];
		this.pageNumber = 1;
		this.removedIndex = -1;
	}
	createTable( $dataTableContainer) {
		
		this.dataTableContainer =  $dataTableContainer;
		const $table = document.createElement('table');
		this.table = $table;
		this.search();
		this.dataTableContainer.appendChild($table);
		this.dataTableContainer.classList.add(this.tableClassName);
		this.createInput();
		this.createThead();
		this.createTbody();
		this.renderData();
		this.createPagination();

	}
	createInput(){
		const $chooseCount = document.createElement('form');
		const $label = document.createElement('label');
		const $select = document.createElement('select');
		
	    for(let i = 2; i <= 10; i = i + 2){
			const $option = document.createElement('option');
			$option.value = i;
			$option.innerHTML = i;
			$select.appendChild($option);
			$select.addEventListener("change", (event) => {
				console.dir(event.target.value)
				this.count = + event.target.value;
				this.countOfPages = Math.ceil(this.data.length / this.count);
				this.createPagination();
				this.goOnThePage();
			 })
		}
		$label.appendChild($select);
		$chooseCount.appendChild($label);

	    this.dataTableContainer.appendChild($chooseCount);
	}
	createThead() {
		const $thead = document.createElement('thead');
		const $tr = document.createElement('tr');
		const $remove = document.createElement('th');
        const $delete = document.createElement('div');
		$delete.innerHTML = 'Delete';
		this.columns.forEach((column) => {
			const $th = document.createElement('th');
			$th.innerHTML = column.value;
			$th.setAttribute('data-sort',column.sortId);
			$th.setAttribute('data-sort-order','asc');
			$tr.appendChild($th);
			$th.addEventListener('click', (e) => {
				const { sort, sortOrder } = e.target.dataset;
				this.data = this.data.sort((a, b) =>{
					if(typeof(a[sort]) === 'number') {
						if (sortOrder === 'asc') {
						 e.target.setAttribute('data-sort-order','desc') 
						 return parseFloat(a[sort]) - parseFloat(b[sort]);
						}else { 
							e.target.setAttribute('data-sort-order','asc') 
							return parseFloat(b[sort]) - parseFloat(a[sort]);
						}
					} else {
						if (sortOrder === 'asc') {
							e.target.setAttribute('data-sort-order','desc') 
							return a[sort].localeCompare(b[sort]);
						   } else { 
							   e.target.setAttribute('data-sort-order','asc') 
							   return b[sort].localeCompare(a[sort]);;
						   }
						
					}});
					
				this.goOnThePage();
			});
			
		});
		$tr.appendChild($remove);
		$remove.appendChild($delete);
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
		this.$trs = data.map((item, index) => {			
			const $removeTd = document.createElement('td');
			const $imgRemove = document.createElement('img');
			$imgRemove.src  = '../assets/images/delete.png';
			$removeTd.appendChild($imgRemove);
			$removeTd.addEventListener('click', ()=>{
				this.removedIndex = item.id;
                this.deleteItem();			
			})
			const $tr = document.createElement('tr');
			for (const key in item) {
				const $td = document.createElement('td');
				$td.innerHTML = item[key];
				$tr.appendChild($td);
				$tr.appendChild($removeTd);			
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

	search(){
		const $search = document.createElement('div');
		const $input = document.createElement('input');
		const $button = document.createElement('button');
		$search.appendChild($input);
		$search.appendChild($button);
		$button.innerHTML = 'Enter';
		this.dataTableContainer.appendChild($search);
		$button.onclick = () => {
			this.data = [...this.originalData];
			let newData = this.data.filter( (column) => column.name === $input.value)
			this.data = newData;
			this.countOfPages = Math.ceil( this.data.length / this.count);
			this.createPagination();
			 this.goOnThePage();
			}
			
		 }
	deleteItem(){
		let remaining = this.data.filter(item => item.id !== this.removedIndex);
		this.data = remaining;
		console.log(this.removedIndex);
		this.countOfPages = Math.ceil(this.data.length / this.count);
		this.goOnThePage();
		this.createPagination();
	}	 
		
	}

export default DataTable;
