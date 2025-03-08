module Jekyll
    class MultiPageGenerator < Generator
      safe true
  
      def generate(site)

        # Get all _data files inside _data/cv/ and extract their names
        cvsets = "cv"
        data_dir = File.join(site.source, "_data", cvsets)
        cvdata = Dir.children(data_dir).map { |f| File.basename(f, File.extname(f)) }

        # Get all layout files inside _layouts/cv/ and extract their names
        layouts_dir = File.join(site.source, "_layouts", cvsets)
        layouts = Dir.children(layouts_dir).map { |f| File.basename(f, File.extname(f)) }
        
        cvdata.each do |dataset| 
            layouts.each do |layout_name|
                page = PageWithoutAFile.new(site, site.source, "", "#{cvsets}/#{dataset}/#{layout_name}.html")
                page.content = "This is generated content for the #{layout_name} layout."
                page.data["layout"] = "#{cvsets}/#{layout_name}"
                page.data["title"] = "#{dataset}-#{layout_name}"
                page.data["cvdata"] = site.data[cvsets][dataset]
                site.pages << page
            end
        end
      end
    end
  end
  