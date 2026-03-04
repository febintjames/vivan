const VivianLogo = ({ white = false }) => (
    <div style={{ width: 182.14, height: 56, position: 'relative' }}>
        <img
            src={white ? "/vivian-logo-white.svg" : "/vivian-logo-black.svg"}
            alt="Vivian Business Solutions"
            className="block w-full h-full object-contain"
        />
    </div>
);

export default VivianLogo;

