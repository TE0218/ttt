//Function to read the keyboard keycodes
function getKeyCode(event) {
  event = event || window.event;
  return event.keyCode;
}

//Function to interprete the left and right arrow on the keyboard. 
//Can be used to skip to previous and next slide.
window.onkeydown = function(event)
{
  var charCode  = getKeyCode(event);
  if (charCode == 37) {
    document.getElementsByClassName('first')[0].children[0].click();
  }
    if (charCode == 39) {
    document.getElementsByClassName('last')[0].children[0].click();
  }
}

function toggle(obj, mode)
{
	//hides and shows the div with class = "showhide"
	var msg;
	var div = obj.nextSibling;
	msg = document.getElementById('a1');
	if(div.className == "show") 
	{
		div.className = "hide";
		if(mode ==1)
		{
			msg.innerHTML = '<p>For more details please refer to </p>';
		}
		else
		{
			msg.innerHTML = '<p>Weitere Einzelheiten finden sie nachfolgend </p>';
		}
	}
	else 
	{
		div.className = "show";
		if(mode ==1)
		{
			msg.innerHTML = '<p>Collapse information <img src="resources/images/up_arrow.gif"/></p>';
		}
		else
		{
			msg.innerHTML = '<p>Zusatzinformationen verbergen <img src="resources/images/up_arrow.gif"/></p>';
		}
	}
}

function appendIEcss()
{	
	if(getBrowserInfo())
	{
		//Find the place of the new node.
		var children =  document.getElementsByTagName("*");
		var i;
		for(i = 0; i < children.length; i++)
		{
			if(children[i].tagName == 'head' || children[i].tagName == 'HEAD') 
			{
				break;
			}			
		}

		//Create the new node.
		var ieNode = document.createElement('link');
		ieNode.setAttribute('rel', 'stylesheet');
		ieNode.setAttribute('type', 'text/css');
		ieNode.setAttribute('href', 'resources/css/IE-patch.css');

		//Append the new node.
		children[i].appendChild(ieNode);
	}
}

function appendToDiv()
{
	//Appends the additional css file, used by IE.
	appendIEcss();
	
	//Find paragraph with text: For more details please refer to
	var messageEN = "For more details please refer to";
	var messageDE = "Weitere Einzelheiten finden sie nachfolgend";
	var flagEN = false;
	var flagDE = false;
	var children =  document.getElementsByTagName("*");
	var i;
	for(i = 0; i < children.length; i++)
	{
		if(children[i].tagName == 'h1' || children[i].tagName == 'H1' ||
		children[i].tagName == 'h2' || children[i].tagName == 'H2' ||
		children[i].tagName == 'h3' || children[i].tagName == 'H3' ||
		children[i].tagName == 'h4' || children[i].tagName == 'H4' ||
		children[i].tagName == 'h5' || children[i].tagName == 'H5' ||
		children[i].tagName == 'h6' || children[i].tagName == 'H6' ||
		children[i].tagName == 'h7' || children[i].tagName == 'H7' ||
		children[i].tagName == 'h8' || children[i].tagName == 'H8' ||
		children[i].tagName == 'h9' || children[i].tagName == 'H9') 
		{
			if(children[i].innerHTML.search(messageEN)!=-1)
			{
				flagEN = true;
				break;
			}
			if(children[i].innerHTML.search(messageDE)!=-1)
			{
				flagDE = true;
				break;
			}
		}			
	}
	
	//If there is "For more details please refer to" in the document
	if(children[i])
	{
		//Add two new nodes - a and div to "bottom" div and remove heading with "For more details please refer to"
		//as it will be included as an <a>
		
		//"bottom" div
		var bottomNode = document.createElement('div');
		bottomNode.setAttribute('class', 'bottom');
		var pageNumberNode = document.getElementById('pageNumber');
		insertAfter(bottomNode, pageNumberNode);
		children[i].setAttribute('id', 'toremove');
		var toremove = children[i];
		children[i].parentNode.removeChild(toremove);
		
		//surrounding div in the "bottom" div. This is done in case of using multiple show/hide documents
		var surroundNode = document.createElement('div');
		bottomNode.appendChild(surroundNode);
		
		//<a> in surrounding div in "bottom"	
		var aNode = document.createElement('a');
		if(flagEN)
		{
			aNode.setAttribute('onclick', "toggle(this, 1);");	//1 - EN
		}
		else
		{
			aNode.setAttribute('onclick', "toggle(this, 2);");	//2 - DE
		}
		aNode.setAttribute('id', 'a1');
		aNode.setAttribute('style', 'cursor: pointer');
		surroundNode.appendChild(aNode);
		if(flagEN)
		{
			aNode.innerHTML = messageEN;
		}
		else
		{
			aNode.innerHTML = messageDE;
		}
		
//		//Add down arrow to <a>
//		var imgNode = document.createElement('img');
//		imgNode.setAttribute('src', 'resources/images/down_arrow.gif');
//		aNode.appendChild(imgNode);
		
		//<div class="showhide" in surrounding div in "bottom"
		var divNode = document.createElement('div');
		divNode.setAttribute('class', 'hide');
		divNode.setAttribute('id', 'div1');
		surroundNode.appendChild(divNode);

	//	Append all nodes that form the show/hide section after div "bottom" as his children
	//	and remove those nodes from their old places to avoid repetition (they are already children of divNode)
		var n = children[i];
		while(n) {
			var new_node = n.cloneNode(true);
			divNode.appendChild(new_node);
			var remove = n;
			n = n.nextSibling;
			remove.parentNode.removeChild(remove);
		}
	}
	//If there is no document to be shown and hidden
	else
	{
		var j, k, p, q = -1;
		var flag = 3;
		
		var htmlTag, bodyTag, divAllTag;
		
		//Find the right place for the bottom of the page
		for (i = 0; document.childNodes[i]; i++)
		{
//			alert(document.childNodes[i]);
			if(document.childNodes[i].tagName == 'html' || document.childNodes[i].tagName == 'HTML')
			{
				htmlTag = document.childNodes[i];
				for(j = 0; htmlTag.childNodes[j]; j++)
				{
					if(htmlTag.childNodes[j].tagName == 'body' || htmlTag.childNodes[j].tagName == 'BODY')
					{
						bodyTag = htmlTag.childNodes[j];
						for(k = 0; bodyTag.childNodes[k]; k++)
						{
							if(bodyTag.childNodes[k].tagName == 'div' || bodyTag.childNodes[k].tagName == 'DIV')
							{
								divAllTag = bodyTag.childNodes[k];
								for(p = 0; divAllTag.childNodes[p]; p++)
								{
									if(divAllTag.childNodes[p].tagName == 'div' || divAllTag.childNodes[p].tagName == 'DIV')
									{
										flag--;
										if(flag == 0) q = p;	//Remember the position of the needed div tag. The loop doesn't stop here, because flag might become < 0.
										if(flag < 0) break;		
									}
								}
								break;
							}
						}
						break;
					}
				}
				break;
			}
		}
		
		//Adding the div with class="bottom"
		if(flag == 0 && q!= -1)
		{
			//"bottom" div
			var pageNumberNode = divAllTag.childNodes[q];
			var bottomNode = document.createElement('div');
			bottomNode.setAttribute('class', 'bottom');
			insertAfter(bottomNode, pageNumberNode);
			
			
			
		}
		else
		{
			alert("Error on page. Div class='bottom' is missing");
		}
	}
}


function insertAfter(new_node, existing_node) {
// if the existing node has a following sibling, insert the current
// node before it. otherwise appending it to the parent node
// will correctly place it just after the existing node.

if (existing_node.nextSibling) {
// there is a next sibling. insert before it using the mutual
// parent's insertBefore() method.
	existing_node.parentNode.insertBefore(new_node, existing_node.nextSibling);
} 
else {
// there is no next sibling. append to the end of the parent's
// node list.
existing_node.parentNode.appendChild(new_node);
}

} 

function removeElements(divElement) 
{
//Removes all siblings after the current element (divElement)
	var ns;
	while (ns=divElement.nextSibling) 
	{
		divElement.parentNode.removeChild(ns); 
	}
}

function getBrowserInfo()
{
	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var fullVersion  = ''+parseFloat(navigator.appVersion); 
	var majorVersion = parseInt(navigator.appVersion,10);
	var nameOffset;
	var verOffset;
	var ix;

	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset=nAgt.indexOf("Opera"))!=-1) 
	{
		browserName = "Opera";
		fullVersion = nAgt.substring(verOffset+6);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
		{
			fullVersion = nAgt.substring(verOffset+8);
		}
	}
	
	// In MSIE, the true version is after "MSIE" in userAgent
	else
	{	
		if ((verOffset=nAgt.indexOf("MSIE"))!=-1) 
		{
			browserName = "Microsoft Internet Explorer";
			fullVersion = nAgt.substring(verOffset+5);
		}
	
	// In Chrome, the true version is after "Chrome" 
		else 
		{
			if ((verOffset=nAgt.indexOf("Chrome"))!=-1) 
			{
				browserName = "Chrome";
				fullVersion = nAgt.substring(verOffset+7);
			}

	// In Safari, the true version is after "Safari" or after "Version" 
			else 
			{
				if ((verOffset=nAgt.indexOf("Safari"))!=-1) 
				{
					browserName = "Safari";
					fullVersion = nAgt.substring(verOffset+7);
					if ((verOffset=nAgt.indexOf("Version"))!=-1) 
					{
						fullVersion = nAgt.substring(verOffset+8);
					}
				}
			// In Firefox, the true version is after "Firefox" 
				else 
				{
					if ((verOffset=nAgt.indexOf("Firefox"))!=-1) 
					{
						 browserName = "Firefox";
						 fullVersion = nAgt.substring(verOffset+8);
					}
		// In most other browsers, "name/version" is at the end of userAgent 
					else 
					{
						if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) 
						{
							browserName = nAgt.substring(nameOffset,verOffset);
							fullVersion = nAgt.substring(verOffset+1);
							if (browserName.toLowerCase()==browserName.toUpperCase()) 
							{
								browserName = navigator.appName;
							}
						}
					}
				}
			}
		}
	}
	
	// trim the fullVersion string at semicolon/space if present
	if ((ix=fullVersion.indexOf(";"))!=-1)
	{
		fullVersion=fullVersion.substring(0,ix);
	}
	if ((ix=fullVersion.indexOf(" "))!=-1)
	{
		fullVersion=fullVersion.substring(0,ix);
	}

	majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) 
	{
		fullVersion  = ''+parseFloat(navigator.appVersion); 
		majorVersion = parseInt(navigator.appVersion,10);
	}

	//Check if the browser is IE and its version is less or equal than 7
	if(browserName == "Microsoft Internet Explorer")
	{
		if(majorVersion<=7)
		{
			return true;
		}

	}
	return false;
}