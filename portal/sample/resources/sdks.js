MobileSDK = Class.create({
	/**
	 * Render the items that will trigger a studio's command.
	 */
	render : function() {
		// Get the div for the command-example.
		mobileSDKDiv = $('mobileSDKs');
		with(Elements.Builder) {
			iOSVersionInfo = this.getVersionInfo("iOS");
			androidVersionInfo = this.getVersionInfo("Android");
			//alert($H(androidVersionInfo).inspect());
			if( typeof (iOSVersionInfo) !== 'undefined' && typeof (androidVersionInfo) !== 'undefined') {
				iosTable = table({"border":"1", "style" : "border-collapse:collapse"},
					tbody(
						tr(
							td("Installed iOS Version: "), 
							td(iOSVersionInfo["installedPlatform"])
						),
						tr(
							td("Minimum Required Version: "),
							td(iOSVersionInfo["requiredPlatform"])
						), 
						tr(
							td("Needs Update: "), 
							td(iOSVersionInfo["shouldUpdatePlatform"])
						)
					)
				);
				androidTable = table({"border":"1", "style" : "border-collapse:collapse"},
				  tbody(
						tr(
							td("Installed Platforms: "), 
							td(androidVersionInfo["installedPlatforms"])
						),
						tr(
							td("Required Platforms: "),
							td(androidVersionInfo["requiredPlatforms"])
						), 
						tr(
							td("Needs Platforms Update: "), 
							td(androidVersionInfo["shouldUpdatePlatforms"])
						),
						tr(
							td("Installed Platform-Tools: "), 
							td(androidVersionInfo["installedPlatformTools"])
						),
						tr(
							td("Required Platform-Tools: "),
							td(androidVersionInfo["requiredPlatformTools"])
						), 
						tr(
							td("Needs Platform-Tools Update: "), 
							td(androidVersionInfo["shouldUpdatePlatformTools"])
						), 
						tr(
							td("Installed SDK-Tools: "), 
							td(androidVersionInfo["installedSDKTools"])
						),
						tr(
							td("Required SDK-Tools: "),
							td(androidVersionInfo["requiredSDKTools"])
						), 
						tr(
							td("Needs SDK-Tools Update: "), 
							td(androidVersionInfo["shouldUpdateSDKTools"])
						),
						tr(
							td("SDK-Tools URL: "), 
							td(androidVersionInfo["sdkURL"])
						),
						tr(
							td("Has JAVA_HOME Setting: "), 
							td(androidVersionInfo["hasJavaHome"])
						)
					)
				);
				
				// Create a div that wraps all of it, so we can easily replace the children on 
				// render calls that were made as a result of an event handling.
				wrapperDiv = div({'id' : 'mobileSDKsContent'});
				wrapperDiv.appendChild(div({"style" : "color:red"}, "=== iOS ==="));
				wrapperDiv.appendChild(iosTable);
				wrapperDiv.appendChild(div({"style" : "color:red"}, "=== Android ==="));
				wrapperDiv.appendChild(androidTable);
				
				// An install/update Android link.
				// Note that for iOS we should just show install instructions.
				wrapperDiv.appendChild(div({"style" : "color:red"}, "=== Android Install/Update ==="));
				installOrUpdate = table(tbody(tr(td(a({'href' : '#'}, "Install/Update Android")))));
				wrapperDiv.appendChild(installOrUpdate);
				
				var prevContent = $('mobileSDKsContent');
        if (prevContent) {
            mobileSDKDiv.replaceChild(wrapperDiv, prevContent);
        } else {
            mobileSDKDiv.appendChild(wrapperDiv);
        }
        
				installOrUpdate.observe('click', function(e) {
					if( typeof (console) !== 'undefined' && typeof (dispatch) !== 'undefined') {
						console.log("Dispatching the 'execute' action on the 'portal.mobileSDK' controller...");
						dispatch($H({
							controller : 'portal.mobileSDK',
							action : "installOrUpdateSDK",
							args : ["Android"].toJSON()
						}).toJSON());
					}
					return false;
				});
			}
		}
	},
	/**
	 * Returns the version information for a requested SDK type (e.g. 'Android', 'iOS' and 'BlackBerry').
	 * The version info we get back is a hash that holds the following fields:
	 *   {
	 *     installedPlatforms:<installed 'platform' versions>, 
	 *     requiredPlatforms : <the required 'platform' versions>, 
	 *     shouldUpdatePlatforms : <boolean value indicating that the platforms should be updated>, 
	 *     installedPlatformTools : <latest installed platform-tools revision>, 
	 *     requiredPlatformTools : <the required platform-tools revision>,
	 *     shouldUpdatePlatformTools : <boolean value indicating that the platform-tools should be updated>, 
	 *     installedSDKTools : <latest installed SDK tools revision>, 
	 *     requiredSDKTools : <the required SDK tools revision>,
	 *     shouldUpdateSDKTools : <boolean value indicating that the SDK tools should be updated>, 
	 *     sdkToolsURL : <SDK Tools URL for an installation/update>
	 *     hasJavaHome : <boolean value indicating that the JAVA_HOME was set>
	 *   }
	 * </pre>
	 * 
	 * <b>NOTE:</b> For iOS and Blackberry, the returned JSON only holds the 'installedPlatform', 'requiredPlatform' and
	 * 'shouldUpdatePlatform' fields.
	 * 
	 */
	getVersionInfo : function(sdk) {

		if( typeof (console) !== 'undefined' && typeof (dispatch) !== 'undefined') {
			console.log("Dispatching the 'getSDKInfo' action on the 'portal.mobileSDK' controller...");
			return dispatch($H({
				controller : 'portal.mobileSDK',
				action : "getSDKInfo",
				args : [sdk].toJSON()
			}).toJSON());
		}
		return null;
	}
});