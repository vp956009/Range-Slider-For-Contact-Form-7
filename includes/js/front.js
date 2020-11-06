jQuery( document ).ready(function() {
    jQuery(".ocrscf_circles-slider ,.ocrscf_circles-slider , .ocrscf_scale-slider ,.ocrscf_slider-display ,.ocrscf_rainbow-slider , .ocrscf_flat-slider , .ocrscf_double-label-slider ").each(function() {
        var step=jQuery(this).attr("step");
        var min=jQuery(this).attr("min");
        var max=jQuery(this).attr("max");
        var prefixx=jQuery(this).attr("prefix");
        var prefixpos='left';
        var sliderdisplay='single';
        var rangeshow=jQuery(this).attr("rangeshow");
        var label=jQuery(this).attr("lable_in");
        var istep = parseInt(step);
        var imin = parseInt(min);
        var imax = parseInt(max);
        var curr = jQuery(this);
       
        if(typeof label === 'undefined') {
            var label = '';
            var rainbow =label.split('|');
        } else {
            var rainbow =label.split('|');
        }

        if(sliderdisplay == "single") {
            if(rangeshow=="disable") {
                jQuery(this).slider({
                        step:istep,
                        min: imin,
                        max:imax,
                        animate:400,
                        values: [imin] 
                    })
                    .slider("pips", {
                        rest:false,
                    }) 
                    .slider("float", {
                           prefix:prefixx,
                           suffix:prefixx,
                        })
                    .on("slidechange", function(e,ui) {
                        curr.find("input").val(ui.values);
                    });          
            } else {
                if(label=="") {
                    if(prefixpos == "left") {
                        jQuery(this).slider({
                            step:istep,
                            min: imin,
                            max:imax,
                            animate:400,
                            values: [imin] 
                        })
                        .slider("pips", {
                            prefix:prefixx,
                            rest: "label",
                          
                        }) 
                        .slider("float", {
                              prefix:prefixx,
                        })
                        .on("slidechange", function(e,ui) {
                            curr.find("input").val(ui.values);
                           
                        }); 
                     
                    } else {
                        jQuery(this).slider({
                            step:istep,
                            min: imin,
                            max:imax,
                            animate: 400,
                            values: [imin] 
                        })
                        .slider("pips", {
                            suffix:prefixx,
                            rest: "label",
                        }) 
                         .slider("float", {
                             suffix:prefixx,
                            })
                        .on("slidechange", function(e,ui) {
                            curr.find("input").val(ui.values);
                           
                        }); 
                    }
                } else {
                     jQuery(this).slider({
                        min: 0,
                        max:rainbow.length-1,
                        animate: 400,
                        values:[min]
                    })
                    .slider("pips", {
                        rest: "label",
                        labels:rainbow,
                    }) 
                    .on("slidechange", function(e,ui) {
                        curr.find("input").val(rainbow[ui.values]);
                       
                    });  
                }
            }
        }else if(sliderdisplay == "double") {
            if(rangeshow=="disable") {
                    jQuery(this).slider({
                            step:istep,
                            min: imin,
                            max:imax,
                            animate:400,
                            range:true,
                            values:[imin,imax-9] 
                        })
                        .slider("pips", {
                            rest:false,
                            
                        }) 
                        .slider("float", {
                               prefix:prefixx,
                              
                            })
                        .on("slidechange", function(e,ui) {
                            curr.find("input").val(ui.values);
                           
                        });
            } else {
                if(label=="") {
                    if(prefixpos =="left") {
                        jQuery(this).slider({
                            step:istep,
                            min:imin,
                            max:imax,
                            animate: 400,
                            range:true,
                            values: [imin,imax-9] 
                        })
                        .slider("pips", {
                            prefix:prefixx,
                            rest: "label",     
                        }) 
                        .slider("float", {
                             prefix:prefixx,
                        })
                      
                        .on("slidechange", function(e,ui) {
                            curr.find("input").val(ui.values);
                           
                        });
                    } else {
                        jQuery(this).slider({
                            step:istep,
                            min: imin,
                            max:imax,
                            animate: 400,
                            range:true,
                            values: [imin,imax-9]       
                        })
                        .slider("pips", {
                            suffix:prefixx,
                            rest: "label",  
                           
                        }) 
                        .slider("float", {
                          suffix:prefixx,
                        })
                      
                        .on("slidechange", function(e,ui) {
                          curr.find("input").val(ui.values);
                        });
                    } 
                } else {
                    jQuery(this).slider({
                        min: 0,
                        max:rainbow.length-1,
                        animate:400,
                        range:true,
                        values:[min,max] 
                    })
                    .slider("pips", {
                      
                        rest: "label",   
                        labels:rainbow,  
                    }) 
                    .on("slidechange", function(e,ui) {
                        curr.find("input").val(rainbow[ui.values[0]]+"-"+rainbow[ui.values[1]]); 
                    });
                }
            }
        } else {
            jQuery(this).slider({
                step:istep,
                min: imin,
                max:imax,
                range:true,
                values: [imin,imax-9] 
            })
            .slider("pips", {
                rest:false,
                prefix:prefixx,

            }) 
            .on("slidechange", function(e,ui) {
            curr.find("input").val(ui.values); 
            });
        }
    });
});