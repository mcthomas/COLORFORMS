%x{console.log(window)}
  
  module P5
  def self.method_missing(name, *args)
    %x{
      obj = window[name];
      if (typeof(obj) == 'function') {
        return window[name].apply(window, args);
      } else {
        return window[name];
      }
    }
  end

  %x{
    window.setup = function() { Opal.top.$setup(); };
    window.draw = function() { Opal.top.$draw(); };
  }
end

def setup
  P5.createCanvas(P5.windowWidth, P5.windowHeight)
  P5.frameRate(4)
end

def draw
  P5.background(255)
  P5.circle(100,100,100)
end
