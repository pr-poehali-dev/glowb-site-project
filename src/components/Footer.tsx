import Icon from "@/components/ui/icon";

const Footer = () => {
  return (
    <footer className="glass-effect p-6 mt-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="font-playfair font-bold text-lg flex items-center">
              <span className="text-glowb-blue-deep mr-1">GLOWBYTE</span>
            </div>
            <p className="text-sm text-gray-600">Digital content management</p>
          </div>

          <div className="flex space-x-6">
            <a href="#" className="hover-glow rounded-full p-2">
              <Icon name="Instagram" className="h-5 w-5" />
            </a>
            <a href="#" className="hover-glow rounded-full p-2">
              <Icon name="Twitter" className="h-5 w-5" />
            </a>
            <a href="#" className="hover-glow rounded-full p-2">
              <Icon name="Youtube" className="h-5 w-5" />
            </a>
            <a href="#" className="hover-glow rounded-full p-2">
              <Icon name="Facebook" className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-glowb-blue border-opacity-20 text-center text-sm text-gray-600">
          <p className="flex items-center justify-center">
            Made with{" "}
            <Icon name="Heart" className="h-4 w-4 mx-1 text-glowb-pink" /> for
            content creators
          </p>
          <p className="mt-1">
            © {new Date().getFullYear()} GLOWBYTE - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
