var data_to_send = {
	colesterol: 'False',
	glicemie_doua_ore: 'False',
	glicemie_nemancate: 'False',
	hiperlipidemie: 'False',
	hipertensiune: 'False',
	talie: 'False'
};

var CMDSTotal = 0;
var ModifiedCMDSTotal = 0;

window.onload = function () {
	var SELECTED_COLOR = 'red';
	var cmdsFields = document.querySelectorAll('.cmds-input-table .cmds');
	var modifiedCMDSFields = document.querySelectorAll('.cmds-input-table .modified-cmds');

	var CMDS_SELECTED_FEIDLS = [];
	var MODIFIED_CMDS_SELECTED_FEIDLS = [];

	var groups = {
		10: 'group-1',
		20: 'group-2',
		30: 'group-3',
		40: 'group-4',
		50: 'group-5',
		60: 'group-6',
		70: 'group-7',
		100: 'group-8',
	};

	function resetResuls(className) {
		var fields = document.querySelectorAll('.cmds-results-table .' + className);

		for (var i = 0; i < fields.length; i++) {
			fields[i].bgColor = '';
		}
	}

	function getGroupIdByTotal(total) {
		if (total < 10 || total === 10) {
			return groups["10"];
		}

		if (total < 20 || total === 20) {
			return groups['20'];
		}

		if (total < 30 || total === 30) {
			return groups['30'];
		}

		if (total < 40 || total === 40) {
			return groups['40'];
		}

		if (total < 50 || total === 50) {
			return groups['50'];
		}

		if (total < 60 || total === 60) {
			return groups['60'];
		}

		if (total < 70 || total === 70) {
			return groups['70'];
		}

		if (total > 70) {
			return groups['100'];
		}
	}

	function calculateTotal() {
		var cmdsGroup;
		var modifiedCmdsGroup;

		for (var i = 0; i < CMDS_SELECTED_FEIDLS.length; i++) {
			CMDSTotal += CMDS_SELECTED_FEIDLS[i];
			CMDS_SELECTED_FEIDLS.splice(i, 1);
		}

		for (var k = 0; k < MODIFIED_CMDS_SELECTED_FEIDLS.length; k++) {
			ModifiedCMDSTotal += MODIFIED_CMDS_SELECTED_FEIDLS[k];
			MODIFIED_CMDS_SELECTED_FEIDLS.splice(k, 1);
		}

		if (CMDSTotal !== null) {
			document.getElementById('totalCMDS').innerText = CMDSTotal;
			cmdsGroup = getGroupIdByTotal(CMDSTotal);
			var cmdsField = document.querySelector('#' + cmdsGroup + ' .cmds');
			resetResuls('cmds');
			if (CMDSTotal !== 0) {
				cmdsField.bgColor = SELECTED_COLOR;
			}
		}

		if (ModifiedCMDSTotal !== null) {
			document.getElementById('totalModifiedCMDS').innerText = ModifiedCMDSTotal;
			modifiedCmdsGroup = getGroupIdByTotal(ModifiedCMDSTotal);
			var modifiedCmdsField = document.querySelector('#' + modifiedCmdsGroup + ' .modified-cmds');
			resetResuls('modified-cmds');
			if (ModifiedCMDSTotal !== 0) {
				modifiedCmdsField.bgColor = SELECTED_COLOR;
			}
		}
	}

	function onFieldClick(evt) {
		evt.preventDefault();

		var target = evt.target;
		var value = target.getAttribute('data');
		var isCMDS = !(target.className.indexOf('modified-cmds') > -1);

		var isSelected = target.bgColor === SELECTED_COLOR;

		data_to_send[document.getElementById(this.getAttribute("id")[0]).title] = !isSelected ? 'True' : 'False';

		if (isSelected && value) {
			if (isCMDS) {
				CMDSTotal -= +value;
			} else {
				ModifiedCMDSTotal -= +value;
			}
			target.bgColor = '';
		} else if (value) {
			target.bgColor = SELECTED_COLOR;
			if (isCMDS) {
				CMDS_SELECTED_FEIDLS.push(+value);
			} else {
				MODIFIED_CMDS_SELECTED_FEIDLS.push(+value);
			}
		}

		calculateTotal();
	}

	for (var i = 0; i < cmdsFields.length; i++) {
		cmdsFields[i].addEventListener('click', onFieldClick);
	}

	for (var k = 0; k < modifiedCMDSFields.length; k++) {
		modifiedCMDSFields[k].addEventListener('click', onFieldClick);
	}

};
