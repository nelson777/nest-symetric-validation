# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "ubuntu/focal64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  #config.vm.network "private_network", ip: "192.168.0.177"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  config.vm.network "public_network", ip: "192.168.0.111"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  #config.vm.synced_folder "/home/nelson/Downloads/assiste", "/vagrant/videos"
  #config.vm.synced_folder "/media/nelson/HDD/assiste", "/vagrant/assiste-site"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
    vb.memory = "4096"
  end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  if Vagrant.has_plugin?("vagrant-timezone")
    config.timezone.value = :host
  else
    puts "ATTENTION: vagrant-timezone plugin not available"
  end

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
    echo -e "Package: snapd\nPin: release a=*\nPin-Priority: -10" > /etc/apt/preferences.d/nosnap.pref
    apt update
    apt -y remove snapd
    echo 'PATH=/vagrant:/vagrant/backend:/vagrant/frontend:`echo $PATH`' >> /home/vagrant/.profile
    cd /usr/bin
    curl -L https://raw.githubusercontent.com/tj/n/master/bin/n -o n
    chmod +x /usr/bin/n
    ./n lts
    npm install -g yarn
    curl -sS https://starship.rs/install.sh | sh -s -- -y 
  SHELL

  config.vm.provision "shell", privileged: false, inline: <<-SHELL
      echo 'PATH=/vagrant:/vagrant/backend:/vagrant/frontend:`echo $PATH`' >> /home/vagrant/.profile
      mkdir -p ~/.config && touch ~/.config/starship.toml 
      echo -e "command_timeout=10000\n[hostname]\ndisabled=true" >> ~/.config/starship.toml 
      echo -e 'eval \"\$(starship init bash)\"' >> ~/.bashrc 
  SHELL
end
